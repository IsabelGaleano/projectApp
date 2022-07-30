/* eslint-disable */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICreateOrderRequest, IPayPalConfig } from 'ngx-paypal';
import { PagoFinalPaqueteService } from './pago-final-paquetes.service';

@Component({
  selector: 'jhi-pago-final-paquetes',
  templateUrl: './pago-final-paquetes.component.html',
})
export class PagoFinalPaquetesComponent implements OnInit {
  success = false;
  public payPalConfig?: IPayPalConfig;
  clienteID: String | any;
  rastreador: any;
  donacionPaquete: any;
  startup: any;
  paquete: any;
  usuario: any;

  constructor(private pagoService: PagoFinalPaqueteService, private router: Router) {
    this.rastreador = JSON.parse(sessionStorage.rastreadorPaquete);
    this.donacionPaquete = JSON.parse(sessionStorage.donacionPaquete);
    this.startup = JSON.parse(sessionStorage.startupEnvioPaqueteObject);
    this.paquete = JSON.parse(sessionStorage.paqueteRegistroEnvioObject);
    this.usuario = JSON.parse(sessionStorage.usuarioLoginObject);

    console.warn(this.rastreador);
    console.warn(this.donacionPaquete);
    console.warn(this.startup);
    console.warn(this.paquete);
    console.warn(this.usuario);
  }

  ngOnInit(): void {
    const router = this.router;
    this.pagoService.getKeyPaypal().subscribe((result: any) => {
      this.clienteID = result[0];

      this.payPalConfig = {
        currency: 'USD',
        clientId: this.clienteID,
        createOrderOnClient: data =>
          <ICreateOrderRequest>{
            intent: 'CAPTURE',
            purchase_units: [
              {
                amount: {
                  currency_code: 'USD',
                  value: String(this.donacionPaquete.montoTotal),
                  breakdown: {
                    item_total: {
                      currency_code: 'USD',
                      value: String(this.donacionPaquete.montoTotal),
                    },
                  },
                },
                items: [
                  {
                    name: this.paquete.descripcion,
                    quantity: '1',
                    unit_amount: {
                      currency_code: 'USD',
                      value: String(this.donacionPaquete.montoTotal),
                    },
                  },
                ],
              },
            ],
          },
        advanced: {
          commit: 'true',
        },
        style: {
          label: 'paypal',
          layout: 'vertical',
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          console.warn(order);
          this.donacionPaquete.estado = 'Iniciado';
          this.pagoService.actualizarDonacion(this.donacionPaquete.id, this.donacionPaquete).subscribe((result: any) => {
            this.success = true;
            window.setTimeout(function () {
              router.navigate(['lista-donaciones-usuario']);
            }, 3000);
          });
        },
        onClientAuthorization: data => {
          console.warn('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
        },
      };
    });
  }
}
