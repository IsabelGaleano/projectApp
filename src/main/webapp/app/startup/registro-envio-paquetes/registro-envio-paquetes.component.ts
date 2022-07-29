/* eslint-disable */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Loader } from '@googlemaps/js-api-loader';
import { RegistroEnvioPaqueteService } from './registro-envio-paquetes.service';

@Component({
  selector: 'jhi-registro-envio-paquetes',
  templateUrl: './registro-envio-paquetes.component.html',
  styleUrls: ['./registro-envio-paquetes.component.scss'],
})
export class RegistroEnvioPaquetesComponent implements OnInit {
  map: google.maps.Map | undefined;
  latitudMarker = 0;
  longitudMarker = 0;
  startup: any;
  paquete: any;
  usuarioFinal: any;
  constructor(private router: Router, private RegistroEnvioService: RegistroEnvioPaqueteService) {
    console.warn(sessionStorage.getItem('paqueteRegistroEnvio'));

    this.RegistroEnvioService.getStartupByCorreo(sessionStorage.getItem('startupEnvioPaquete')).subscribe((resultS: any) => {
      if (resultS) {
        this.startup = resultS;
      }
    });

    this.RegistroEnvioService.getPaquete(sessionStorage.getItem('paqueteRegistroEnvio')).subscribe((resultP: any) => {
      if (resultP) {
        this.paquete = resultP;
        console.warn(resultP);
      }
    });

    this.RegistroEnvioService.getUsuarioByCorreo(sessionStorage.getItem('usuarioLogin')).subscribe((resultU: any) => {
      if (resultU) {
        this.usuarioFinal = resultU;
      }
    });
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
  calcularDistancia(latUser: any, lngUser: any, latStartup: any, lngUStartup: any): any {
    var R = 6371.071;
    var rlat1 = latUser * (Math.PI / 180);
    var rlat2 = latStartup * (Math.PI / 180);
    var difflat = rlat2 - rlat1;
    var difflon = (lngUStartup - lngUser) * (Math.PI / 180);

    var d =
      2 *
      R *
      Math.asin(
        Math.sqrt(
          Math.sin(difflat / 2) * Math.sin(difflat / 2) + Math.cos(rlat1) * Math.cos(rlat2) * Math.sin(difflon / 2) * Math.sin(difflon / 2)
        )
      );
    return d;
  }

  registrarDonacionPaquete(): void {
    console.warn(this.usuarioFinal);
    console.warn(this.startup);
    console.warn(this.paquete);
    //this.router.navigate(['pago-paquete-startup']);
    const latitudDireccionUser = <HTMLInputElement>document.getElementById('latitud');
    const longitudDireccionUser = <HTMLInputElement>document.getElementById('longitud');

    const distancia = this.calcularDistancia(
      latitudDireccionUser.value,
      longitudDireccionUser.value,
      this.startup.latitudDireccion,
      this.startup.longitudDireccion
    );

    console.warn(Math.round(distancia));

    const montoEnvioCal = Math.round(distancia) * 0.5;
    const montoTotalCal = montoEnvioCal + 1 + this.paquete.monto;

    const donacionesPaquetes = {
      descripcion: this.paquete.descripcion,
      montoEnvio: montoEnvioCal,
      montoImpuesto: 1,
      montoTotal: montoTotalCal,
      fechaDonacion: new Date(),
      estado: 'Pendiente',
      idUsuario: this.usuarioFinal,
      idStartup: this.startup,
      idPaquete: this.paquete,
    };

    this.RegistroEnvioService.registrarDonacion(donacionesPaquetes).subscribe((data: any) => {
      if (data) {
        console.warn(data);
        const rastreador = {
          descripcion: 'UsuarioEntrega',
          latitud: latitudDireccionUser.value,
          longitud: longitudDireccionUser.value,
          fecha: new Date(),
          estado: 'Activo',
          idDonacionPaquete: data,
        };

        this.RegistroEnvioService.registrarUbicación(rastreador).subscribe((dataRastreador: any) => {
          if (dataRastreador) {
            console.warn(data);
          }
        });
      }
    });
  }
}
