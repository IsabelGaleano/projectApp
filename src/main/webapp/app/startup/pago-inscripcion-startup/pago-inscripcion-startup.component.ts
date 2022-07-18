/* eslint-disable */
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { PagoInscripcionStartupService } from './pago-inscripcion-startup.service';
declare const paypal: any;

@Component({
  selector: 'jhi-pago-inscripcion-startup',
  templateUrl: './pago-inscripcion-startup.component.html',
})
export class PagoInscripcionStartupComponent implements OnInit {
  @ViewChild('paypal', { static: true })
  paypalElement!: ElementRef;
  success = false;

  constructor(
    private translateService: TranslateService,
    private pagoInscripcionService: PagoInscripcionStartupService,
    private router: Router
  ) {}

  ngOnInit(): void {
    var producto = JSON.parse(sessionStorage.productInscripcion);
    const router = this.router;
    paypal
      .Buttons({
        createOrder: (data: any, actions: any) => {
          return actions.order.create({
            purchase_units: [
              {
                description: producto.descripcion,
                amount: {
                  currency_code: 'USD',
                  value: producto.precio,
                },
              },
            ],
          });
        },
        onApprove: async (data: any, actions: any) => {
          const order = await actions.order.capture();
          console.warn(order);
          this.pagoInscripcionService.registrarInscripcionMonedero(producto.tipo).subscribe((result: any) => {
            this.success = true;
            window.setTimeout(function () {
              router.navigate(['startup/perfil-startup']);
            }, 5000);
          });
        },
        onError: (err: any) => {
          console.warn(err);
        },
      })
      .render(this.paypalElement.nativeElement);
  }
}
