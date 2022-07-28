/* eslint-disable */
import { Component, OnInit } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';

@Component({
  selector: 'jhi-registro-envio-paquetes',
  templateUrl: './registro-envio-paquetes.component.html',
  styleUrls: ['./registro-envio-paquetes.component.scss'],
})
export class RegistroEnvioPaquetesComponent implements OnInit {
  map: google.maps.Map | undefined;
  latitudMarker = 0;
  longitudMarker = 0;
  constructor() {
    console.warn(sessionStorage.getItem('paqueteRegistroEnvio'));
  }

  ngOnInit(): void {
    const key = this.desencriptar('DLzaVyEXedgqnYlKekZD76jnq4zLMUN6Rfg1nI4');
    const loader = new Loader({
      apiKey: key,
    });
    loader.load().then(() => {
      const latitudDireccionForm = <HTMLInputElement>document.getElementById('latitud');
      const longitudDireccionForm = <HTMLInputElement>document.getElementById('longitud');
      let location = {
        lat: 9.93333,
        lng: -84.08333,
      };

      this.map = new google.maps.Map(<HTMLInputElement>document.getElementById('map'), {
        center: location,
        zoom: 15,
      });

      const marker: google.maps.Marker | undefined = new google.maps.Marker({
        position: location,
        map: this.map,
        draggable: true,
      });
      google.maps.event.addListener(
        marker,
        'dragend',
        function (evt: { latLng: { lat: () => { (): any; new (): any; toString: { (): string; new (): any } }; lng: () => string } }) {
          latitudDireccionForm.value = evt.latLng.lat().toString();

          longitudDireccionForm.value = evt.latLng.lng();
        }
      );
    });
  }
  desencriptar(s: string): string {
    const abecedario = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ';
    let strDescodificado = '';
    let caracter;
    for (let i = 0; i < s.length; i++) {
      caracter = s.charAt(i);
      const pos = abecedario.indexOf(caracter);
      if (pos === -1) {
        strDescodificado += caracter;
      } else {
        if (pos - 3 < 0) {
          strDescodificado += abecedario.charAt(abecedario.length + (pos - 3));
        } else {
          strDescodificado += abecedario.charAt((pos - 3) % abecedario.length);
        }
      }
    }

    return strDescodificado;
  }
}
