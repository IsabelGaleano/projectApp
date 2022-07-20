/* eslint-disable */
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ICreateOrderRequest, IPayPalConfig } from 'ngx-paypal';
import { PagoInscripcionStartupService } from './pago-inscripcion-startup.service';

@Component({
  selector: 'jhi-pago-inscripcion-startup',
  templateUrl: './pago-inscripcion-startup.component.html',
})
export class PagoInscripcionStartupComponent implements OnInit {
  @ViewChild('paypal', { static: true })
  paypalElement!: ElementRef;
  success = false;
  public payPalConfig?: IPayPalConfig;
  clienteID: String | any = process.env.KEY_PAYPAL;

  constructor(
    private translateService: TranslateService,
    private pagoInscripcionService: PagoInscripcionStartupService,
    private router: Router
  ) {}

  ngOnInit(): void {
    var producto = JSON.parse(sessionStorage.productInscripcion);
    const router = this.router;

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
                value: String(producto.precio),
                breakdown: {
                  item_total: {
                    currency_code: 'USD',
                    value: String(producto.precio),
                  },
                },
              },
              items: [
                {
                  name: producto.descripcion,
                  quantity: '1',
                  unit_amount: {
                    currency_code: 'USD',
                    value: String(producto.precio),
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
        this.pagoInscripcionService.registrarInscripcionMonedero(producto.tipo).subscribe((result: any) => {
          this.success = true;
          window.setTimeout(function () {
            router.navigate(['startup/perfil-startup']);
          }, 3000);
        });
      },
      onClientAuthorization: data => {
        console.warn('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
      },
    };
  }
}
