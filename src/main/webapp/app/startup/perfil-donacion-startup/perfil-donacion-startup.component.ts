/* eslint-disable */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faL } from '@fortawesome/free-solid-svg-icons';
import { Loader } from '@googlemaps/js-api-loader';
import { PerfilDonacionStartupPService } from './perfil-donacion-startup.service';

@Component({
  selector: 'jhi-perfil-donacion-startup',
  templateUrl: './perfil-donacion-startup.component.html',
})
export class PerfilDonacionStartupComponent implements OnInit {
  donacionPaquete: any;
  paquete: any;
  startup: any;
  usuario: any;
  dateDonacion: any;
  success = false;
  isEnabled = true;
  successFinal = false;
  map: google.maps.Map | undefined;
  mapEnvio: google.maps.Map | undefined;
  ubicaciones: any;
  distanceMatrix: any;
  ubicacionInicialRastreador: any;
  ubicacionFinalRastreador: any;
  ubicacionActualRastreador: any;

  inicialForm = this.fb.group({
    fechaInicial: ['', [Validators.required]],
    fechaEntrega: ['', [Validators.required]],
    diasRetraso: ['', [Validators.required]],
  });

  finalForm = this.fb.group({
    fechaFinal: ['', [Validators.required]],
    diasRetrasoFinal: ['', [Validators.required]],
  });

  constructor(private router: Router, private perfilService: PerfilDonacionStartupPService, private fb: FormBuilder) {
    this.donacionPaquete = JSON.parse(sessionStorage.donacionPaqueteStartup);

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

    this.perfilService.getUsuarioByCorreo(this.donacionPaquete.idUsuario.correoElectronico).subscribe((resultU: any) => {
      if (resultU) {
        this.usuario = resultU;
      }
    });

    this.perfilService.getUbicaciones(this.donacionPaquete).subscribe((resultUbicaciones: any) => {
      if (resultUbicaciones) {
        this.ubicaciones = resultUbicaciones;
      }
    });
  }
  ngOnInit(): void {
    const fechatemp = new Date(this.donacionPaquete.fechaDonacion);
    console.warn(fechatemp.toLocaleString());
    this.dateDonacion = fechatemp.toLocaleString();
    console.warn(this.ubicaciones);

    const origin = {
      lat: '9.930251',
      lng: '-84.013474',
    };
    this.cargarMapInicioEnvio();
    this.cargarRastreador();
  }

  iniciarEnvio(): void {
    console.warn('prueba');
    const fechaInicial = <HTMLInputElement>document.getElementById('fechaInicial');
    const fechaEntrega = <HTMLInputElement>document.getElementById('fechaEntrega');
    const diasRetraso = <HTMLInputElement>document.getElementById('diasRetraso');
    const latitudDireccionForm = <HTMLInputElement>document.getElementById('latitud');
    const longitudDireccionForm = <HTMLInputElement>document.getElementById('longitud');

    this.donacionPaquete.fechaInicialEnvio = new Date(fechaInicial.value);
    this.donacionPaquete.fechaPosibleEntrega = new Date(fechaEntrega.value);
    this.donacionPaquete.diasRetraso = diasRetraso.value;
    this.donacionPaquete.estado = 'Activo';
    console.warn(this.distanceMatrix);

    this.perfilService.actualizarDonacion(this.donacionPaquete.id, this.donacionPaquete).subscribe((result: any) => {
      if (result) {
        console.warn(result);
        this.success = true;
        const rastreador = {
          descripcion: 'StartupInicio',
          latitud: latitudDireccionForm.value,
          longitud: longitudDireccionForm.value,
          fecha: new Date(),
          estado: 'Activo',
          idDonacionPaquete: result,
        };

        this.perfilService.registrarUbicación(rastreador).subscribe((dataRastreador: any) => {
          if (dataRastreador) {
            console.warn(dataRastreador);
          }
        });
      }
    });
  }

  finalizarEnvio(): void {
    console.warn('prueba');
    const fechaFinal = <HTMLInputElement>document.getElementById('fechaFinal');
    const diasRetraso = <HTMLInputElement>document.getElementById('diasRetrasoFinal');

    this.donacionPaquete.fechaEntrega = new Date(fechaFinal.value);
    this.donacionPaquete.diasRetraso = diasRetraso.value;
    this.donacionPaquete.estado = 'Finalizado';

    this.perfilService.actualizarDonacion(this.donacionPaquete.id, this.donacionPaquete).subscribe((result: any) => {
      if (result) {
        console.warn(result);
        this.successFinal = true;
      }
    });
  }

  cargarMapInicioEnvio(): void {
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

      this.mapEnvio = new google.maps.Map(<HTMLInputElement>document.getElementById('mapInicial'), {
        center: location,
        zoom: 15,
      });

      const marker: google.maps.Marker | undefined = new google.maps.Marker({
        position: location,
        map: this.mapEnvio,
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

  cargarRastreador(): void {
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
      this.map = new google.maps.Map(<HTMLInputElement>document.getElementById('map'), {
        center: location,
        zoom: 15,
      });

      for (let i = 0; i < this.ubicaciones.length; i++) {
        const latitudValue: number = +this.ubicaciones[i].latitud;
        const longitudValue: number = +this.ubicaciones[i].longitud;

        if (this.ubicaciones[i].descripcion === 'StartupInicio') {
          this.ubicacionInicialRastreador = {
            lat: latitudValue,
            lng: longitudValue,
          };
        }

        if (this.ubicaciones[i].descripcion === 'UsuarioEntrega') {
          this.ubicacionFinalRastreador = {
            lat: latitudValue,
            lng: longitudValue,
          };
        }

        if (this.ubicaciones[i].descripcion === 'Actualizacion') {
          if (this.ubicaciones[i].estado === 'Activo') {
            this.ubicacionActualRastreador = {
              lat: latitudValue,
              lng: longitudValue,
            };
          }
        }
      }

      const markerInicial = new google.maps.Marker({
        position: this.ubicacionInicialRastreador,
        title: 'Hello World!',
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

      markerInicial.setMap(this.map);
      markerActual.setMap(this.map);
      markerFinal.setMap(this.map);

      const flightPlanCoordinates = [this.ubicacionInicialRastreador, this.ubicacionActualRastreador, this.ubicacionFinalRastreador];
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

      const origin1 = { lat: 9.943585, lng: -84.046075 };
      const destinationB = { lat: 9.933578, lng: -84.011699 };
      const request = {
        origins: [origin1],
        destinations: [destinationB],
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.METRIC,
        avoidHighways: false,
        avoidTolls: false,
      };

      service.getDistanceMatrix(request).then(response => {
        console.warn(response);
        this.distanceMatrix = response;
      });
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
