import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
declare const paypal: any;

@Component({
  selector: 'jhi-pago-inscripcion-startup',
  templateUrl: './pago-inscripcion-startup.component.html',
})
export class PagoInscripcionStartupComponent implements OnInit {
  @ViewChild('paypal', { static: true })
  paypalElement!: ElementRef;

  producto = {
    descripcion: 'Pago de la inscripción',
    precio: '8.00',
    img: 'Imagen de tu producto',
  };

  ngOnInit(): void {
    paypal
      .Buttons({
        createOrder: (data: any, actions: any) => {
          return actions.order.create({
            purchase_units: [
              {
                description: this.producto.descripcion,
                amount: {
                  currency_code: 'USD',
                  value: this.producto.precio,
                },
              },
            ],
          });
        },
        onApprove: async (data: any, actions: any) => {
          const order = await actions.order.capture();
          console.warn(order);
        },
        onError: (err: any) => {
          console.warn(err);
        },
      })
      .render(this.paypalElement.nativeElement);
  }
}
