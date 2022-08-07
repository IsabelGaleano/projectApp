/* eslint-disable */
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Loader } from '@googlemaps/js-api-loader';
import { PerfilDonacionUsuarioService } from './perfil-donacion-usuario.service';

@Component({
  selector: 'jhi-perfil-donacion-usuario',
  templateUrl: './perfil-donacion-usuario.component.html',
})
export class PerfilDonacionUsuarioComponent implements OnInit {
  donacionPaquete: any;
  paquete: any;
  startup: any;
  dateDonacion: any;
  map: google.maps.Map | undefined;
  ubicaciones: any;
  distanceMatrix: any;
  ubicacionFinalRastreador: any;
  ubicacionActualRastreador: any;
  existUbicacionActual: any;
  destinationAddresses: any;
  originAddresses: any;
  distancia: any;
  duracion: any;

  constructor(private router: Router, private perfilService: PerfilDonacionUsuarioService, private fb: FormBuilder) {
    this.donacionPaquete = JSON.parse(sessionStorage.donacionPaqueteUsuario);

    console.warn(this.donacionPaquete);

    this.perfilService.getPaquete(this.donacionPaquete.idPaquete.id).subscribe((resultP: any) => {
      if (resultP) {
        this.paquete = resultP;
      }
    });

    this.perfilService.getStartupByCorreo(this.donacionPaquete.idStartup.correoElectronico).subscribe((results: any) => {
      if (results) {
        this.startup = results;
      }
    });
    this.cargarRastreador();
  }

  ngOnInit(): void {
    const fechatemp = new Date(this.donacionPaquete.fechaDonacion);
    console.warn(fechatemp.toLocaleString());
    this.dateDonacion = fechatemp.toLocaleString();
  }

  cargarRastreador(): void {
    this.perfilService.getUbicaciones(this.donacionPaquete).subscribe((result: any) => {
      if (result) {
        this.ubicaciones = result;
        // initialize services
        const key = this.desencriptar('DLzaVyEXedgqnYlKekZD76jnq4zLMUN6Rfg1nI4');
        const loader = new Loader({
          apiKey: key,
        });

        loader.load().then(() => {
          let location = {
            lat: 9.93333,
            lng: -84.08333,
          };

          for (let i = 0; i < this.ubicaciones.length; i++) {
            const latitudValue: number = +this.ubicaciones[i].latitud;
            const longitudValue: number = +this.ubicaciones[i].longitud;
            this.existUbicacionActual = false;
            if (this.ubicaciones[i].descripcion === 'Actualizacion') {
              if (this.ubicaciones[i].estado === 'Activo') {
                this.ubicacionActualRastreador = {
                  lat: latitudValue,
                  lng: longitudValue,
                };
                this.existUbicacionActual = true;
              }
            }
          }

          for (let i = 0; i < this.ubicaciones.length; i++) {
            const latitudValue: number = +this.ubicaciones[i].latitud;
            const longitudValue: number = +this.ubicaciones[i].longitud;

            if (this.existUbicacionActual === false) {
              if (this.ubicaciones[i].descripcion === 'StartupInicio') {
                this.ubicacionActualRastreador = {
                  lat: latitudValue,
                  lng: longitudValue,
                };
              }
            }

            if (this.ubicaciones[i].descripcion === 'UsuarioEntrega') {
              this.ubicacionFinalRastreador = {
                lat: latitudValue,
                lng: longitudValue,
              };
            }
          }

          this.map = new google.maps.Map(<HTMLInputElement>document.getElementById('map'), {
            center: this.ubicacionActualRastreador,
            zoom: 15,
          });

          console.warn(this.ubicacionActualRastreador);

          var markerActual = new google.maps.Marker({
            position: this.ubicacionActualRastreador,
            title: 'Hello World!',
          });

          var markerFinal = new google.maps.Marker({
            position: this.ubicacionFinalRastreador,
            title: 'Hello World!',
          });

          markerActual.setMap(this.map);
          markerFinal.setMap(this.map);

          const flightPlanCoordinates = [this.ubicacionActualRastreador, this.ubicacionFinalRastreador];

          const flightPath = new google.maps.Polyline({
            path: flightPlanCoordinates,
            geodesic: true,
            strokeColor: '#FF0000',
            strokeOpacity: 1.0,
            strokeWeight: 2,
          });

          flightPath.setMap(this.map);

          const geocoder = new google.maps.Geocoder();
          const service = new google.maps.DistanceMatrixService();

          const origin1 = this.ubicacionActualRastreador;
          const destinationB = this.ubicacionFinalRastreador;
          const request = {
            origins: [origin1],
            destinations: [destinationB],
            travelMode: google.maps.TravelMode.DRIVING,
            unitSystem: google.maps.UnitSystem.METRIC,
            avoidHighways: false,
            avoidTolls: false,
          };

          service.getDistanceMatrix(request).then(response => {
            let strOrigin = response.originAddresses[0];
            const arrayOrigin = strOrigin.split(',');

            let strDestination = response.destinationAddresses[0];
            const arrayDestination = strDestination.split(',');

            this.distanceMatrix = response;
            this.destinationAddresses = arrayDestination[1].concat(arrayDestination[2]);
            this.originAddresses = arrayOrigin[1].concat(arrayOrigin[2]);
            this.distancia = response.rows[0].elements[0].distance.text;
            this.duracion = response.rows[0].elements[0].duration.text;
          });
        });
      }
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
