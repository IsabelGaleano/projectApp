/* eslint-disable */
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Loader } from '@googlemaps/js-api-loader';
import { PerfilDonacionUsuarioService } from './perfil-donacion-usuario.service';
import {
  faHandHoldingHeart,
  faMessage,
  faCalendarDay,
  faDollarSign,
  faEnvelope,
  faFileSignature,
  faPhone,
} from '@fortawesome/free-solid-svg-icons';

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
  tabInicial: any = '';
  faHandHoldingHeart = faHandHoldingHeart;
  faMessage = faMessage;
  faCalendarDay = faCalendarDay;
  faDollarSign = faDollarSign;
  faEnvelope = faEnvelope;
  faFileSignature = faFileSignature;
  faPhone = faPhone;

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

    if (this.donacionPaquete.fechaInicialEnvio != null) {
      this.cargarInfoInicial();
    } else {
      this.cargarInfoInicialNula();
    }

    if (this.donacionPaquete.fechaEntrega != null) {
      this.cargarInfoFinal();
    } else {
      this.cargarInfoFinalNula();
    }
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

          const map = new google.maps.Map(<HTMLInputElement>document.getElementById('map'), {
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

          markerActual.setMap(map);
          markerFinal.setMap(map);

          const flightPlanCoordinates = [this.ubicacionActualRastreador, this.ubicacionFinalRastreador];

          const flightPath = new google.maps.Polyline({
            path: flightPlanCoordinates,
            geodesic: true,
            strokeColor: '#FF0000',
            strokeOpacity: 1.0,
            strokeWeight: 2,
          });

          flightPath.setMap(map);

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

            const contentString = `<h5 class="mb-1 tx-15">${this.distancia} de distancia</h5> 
                                    <h5 class="mb-1 tx-15">${this.duracion} de duración</h5>`;

            const infowindow = new google.maps.InfoWindow({
              content: contentString,
            });

            markerActual.addListener('click', () => {
              infowindow.open({
                anchor: markerActual,
                map,
                shouldFocus: false,
              });
            });
          });
        });
      }
    });
  }

  cargarInfoInicial(): void {
    const fechaInicial = document.getElementById('fechaInicial') as HTMLInputElement;
    const fechaEntrega = document.getElementById('fechaEntrega') as HTMLInputElement;
    const diasRetraso = document.getElementById('diasRetraso') as HTMLInputElement;
    const dateInicial = new Date(this.donacionPaquete.fechaInicialEnvio);
    const dateEntrega = new Date(this.donacionPaquete.fechaPosibleEntrega);
    dateInicial.setDate(dateInicial.getDate() + 1);
    dateEntrega.setDate(dateEntrega.getDate() + 1);
    fechaInicial.insertAdjacentText('beforeend', dateInicial.toLocaleString());
    fechaEntrega.insertAdjacentText('beforeend', dateEntrega.toLocaleString());
    diasRetraso.insertAdjacentText('beforeend', this.donacionPaquete.diasRetraso);
  }

  cargarInfoInicialNula(): void {
    const data = 'Dato no registrado';
    const fechaInicial = document.getElementById('fechaInicial') as HTMLInputElement;
    const fechaEntrega = document.getElementById('fechaEntrega') as HTMLInputElement;
    const diasRetraso = document.getElementById('diasRetraso') as HTMLInputElement;
    fechaInicial.insertAdjacentText('beforeend', data);
    fechaEntrega.insertAdjacentText('beforeend', data);
    diasRetraso.insertAdjacentText('beforeend', data);
  }

  cargarInfoFinal(): void {
    const fechaFinal = document.getElementById('fechaFinalEntrega') as HTMLInputElement;
    const diasRetrasoFinal = document.getElementById('diasRetrasoFinal') as HTMLInputElement;
    const dateFinal = new Date(this.donacionPaquete.fechaEntrega);
    dateFinal.setDate(dateFinal.getDate() + 1);
    fechaFinal.insertAdjacentText('beforeend', dateFinal.toLocaleString());
    diasRetrasoFinal.insertAdjacentText('beforeend', this.donacionPaquete.diasRetraso);
  }

  cargarInfoFinalNula(): void {
    const data = 'Dato no registrado';
    const fechaFinal = document.getElementById('fechaFinalEntrega') as HTMLInputElement;
    const diasRetrasoFinal = document.getElementById('diasRetrasoFinal') as HTMLInputElement;
    fechaFinal.insertAdjacentText('beforeend', data);
    diasRetrasoFinal.insertAdjacentText('beforeend', data);
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
