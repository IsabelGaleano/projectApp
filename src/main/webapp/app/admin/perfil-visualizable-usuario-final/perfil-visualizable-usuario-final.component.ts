import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
// import { Usuarios } from 'app/entities/usuarios/usuarios.model';
import { Loader } from '@googlemaps/js-api-loader';

import { AppService } from '../lista-usuarios/lista-usuarios.service';

@Component({
  selector: 'jhi-perfil-visualizable-usuario-final',
  templateUrl: './perfil-visualizable-usuario-final.component.html',
  styleUrls: ['./perfil-visualizable-usuario-final.component.scss'],
})
export class PerfilVisualizableUsuarioFinalComponent implements OnInit {
  usuarioFinal: any;
  correoSession?: string;
  map: google.maps.Map | undefined;
  mapDos: google.maps.Map | undefined;

  constructor(private appService: AppService, private datePipe: DatePipe) {}

  ngOnInit(): void {
    // this.appService.getCorreo().subscribe(correo => {
    //   console.warn('Alex, este es el correo: ' + correo);
    //   // this.appService.getUserRolesByEmail(correo).subscribe((roles:any) => {});
    //   this.appService.getUsuariosByCorreo(correo).subscribe((user) => {
    //     this.usuario = user;
    //     console.warn(this.usuario);
    //   });
    // });

    // this.appService.getCorreo().subscribe(correo => {
    //   console.warn('Alex, este es el correo: ' + correo);
    //   // this.appService.getUserRolesByEmail(correo).subscribe((roles:any) => {});
    //   this.appService.getUsuariosByCorreo(correo).subscribe((user) => {
    //     this.usuario = user;
    //     console.warn(this.usuario);
    //   });
    // });

    console.warn(localStorage.getItem('correoSession'));

    this.correoSession = localStorage.getItem('correoSession') as string;

    this.appService.getUsuariosByCorreo(this.correoSession).subscribe((user: any) => {
      if (user !== undefined) {
        this.usuarioFinal = user;

        this.usuario.fechaNacimiento = this.datePipe.transform(this.usuario.fechaNacimiento, 'yyyy-MM-dd');

        const key = this.desencriptar('DLzaVyEXedgqnYlKekZD76jnq4zLMUN6Rfg1nI4');
        const loader = new Loader({
          apiKey: key,
        });
        loader.load().then(() => {
          const latitudValue: number = +parseFloat(this.usuario.latitudDireccion);
          const longitudValue: number = +parseFloat(this.usuario.longitudDireccion);

          const location = {
            lat: latitudValue,
            lng: longitudValue,
          };

          this.map = new google.maps.Map(<HTMLInputElement>document.getElementById('map'), {
            center: location,
            zoom: 15,
          });
          this.mapDos = new google.maps.Map(<HTMLInputElement>document.getElementById('mapDos'), {
            center: location,
            zoom: 15,
          });

          const marker: google.maps.Marker | undefined = new google.maps.Marker({
            position: location,
            map: this.map,
            draggable: true,
          });

          const markerMapaDos: google.maps.Marker | undefined = new google.maps.Marker({
            position: location,
            map: this.mapDos,
            draggable: true,
          });
          // google.maps.event.addListener(marker, 'dragend', function (evt) {
          //   const latitudDireccionForm = <HTMLInputElement>document.getElementById('latitudDireccionForm');
          //   latitudDireccionForm.value = evt.latLng.lat().toString();

          //   const longitudDireccionForm = <HTMLInputElement>document.getElementById('longitudDireccionForm');
          //   longitudDireccionForm.value = evt.latLng.lng();
          // });
        });
      }

      console.warn(this.usuarioFinal);
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
