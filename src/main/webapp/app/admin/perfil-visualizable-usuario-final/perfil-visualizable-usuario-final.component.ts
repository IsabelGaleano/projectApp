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
  // map: google.maps.Map | undefined;
  mapDos: google.maps.Map | undefined;

  constructor(private appService: AppService, private datePipe: DatePipe) {}

  ngOnInit(): void {
    console.warn(localStorage.getItem('correoSession'));

    this.correoSession = localStorage.getItem('correoSession') as string;

    this.appService.getUsuariosByCorreo(this.correoSession).subscribe((user: any) => {
      if (user !== undefined) {
        this.usuarioFinal = user;

        if (!this.usuarioFinal.nombre || this.usuarioFinal.nombre === ' ') {
          this.usuarioFinal.nombre = 'No existe un nombre reigstrado';
        }

        if (!this.usuarioFinal.cedula || this.usuarioFinal.cedula === ' ') {
          this.usuarioFinal.cedula = 'No existe una cédula reigstrada';
        }

        if (!this.usuarioFinal.primerApellido || this.usuarioFinal.primerApellido === ' ') {
          this.usuarioFinal.primerApellido = 'No existe un primer apellido reigstrado';
        }

        if (!this.usuarioFinal.segundoApellido || this.usuarioFinal.segundoApellido === ' ') {
          this.usuarioFinal.segundoApellido = 'No existe un segundo apellido reigstrado';
        }

        if (!this.usuarioFinal.correoElectronico || this.usuarioFinal.correoElectronico === ' ') {
          this.usuarioFinal.correoElectronico = 'No existe un correo electrónico reigstrado';
        }

        if (!this.usuarioFinal.genero || this.usuarioFinal.genero === ' ') {
          this.usuarioFinal.genero = 'No existe un género reigstrado';
        }

        if (!this.usuarioFinal.telefono || this.usuarioFinal.telefono === ' ') {
          this.usuarioFinal.telefono = 'No existe un teléfono reigstrado';
        }

        if (!this.usuarioFinal.fechaNacimiento || this.usuarioFinal.fechaNacimiento === ' ') {
          this.usuarioFinal.fechaNacimiento = 'No existe una fecha de nacimiento reigstrada';
        } else {
          this.usuarioFinal.fechaNacimiento = this.datePipe.transform(this.usuarioFinal.fechaNacimiento, 'yyyy-MM-dd');
        }

        if (!this.usuarioFinal.latitudDireccion || this.usuarioFinal.latitudDireccion === ' ') {
          this.usuarioFinal.latitudDireccion = 0.0;
        }

        if (!this.usuarioFinal.longitudDireccion || this.usuarioFinal.longitudDireccion === ' ') {
          this.usuarioFinal.longitudDireccion = 0.0;
        }

        if (!this.usuarioFinal.imagenURL || this.usuarioFinal.imagenURL === ' ') {
          this.usuarioFinal.imagenURL = 'No existe una imágen reigstrada';
        }

        if (!this.usuarioFinal.tipoUsuarioFinal || this.usuarioFinal.tipoUsuarioFinal === ' ') {
          this.usuarioFinal.tipoUsuarioFinal = 'No existe un tipo de usuario final reigstrado';
        }

        if (!this.usuarioFinal.contrasennia || this.usuarioFinal.contrasennia === ' ') {
          this.usuarioFinal.contrasennia = 'No existe una contrasennia reigstrada';
        }

        if (!this.usuarioFinal.estado || this.usuarioFinal.estado === ' ') {
          this.usuarioFinal.estado = 'No existe un estado reigstrado';
        }

        if (!this.usuarioFinal.idMonedero) {
          const monedero = {
            id: 0,
            tipo: 'STARTUP',
            saldo: 0.0,
            estado: 'Sin estado de monedero registrado',
          };

          this.usuarioFinal.idMonedero = monedero;
        }

        if (!this.usuarioFinal.idRol) {
          const rol = {
            id: 0,
            rol: 'Sin rol registrado',
          };

          this.usuarioFinal.idRol = rol;
        }

        const key = this.desencriptar('DLzaVyEXedgqnYlKekZD76jnq4zLMUN6Rfg1nI4');
        const loader = new Loader({
          apiKey: key,
        });
        loader.load().then(() => {
          const latitudValue: number = +parseFloat(this.usuarioFinal.latitudDireccion);
          const longitudValue: number = +parseFloat(this.usuarioFinal.longitudDireccion);

          const location = {
            lat: latitudValue,
            lng: longitudValue,
          };

          // this.map = new google.maps.Map(<HTMLInputElement>document.getElementById('map'), {
          //   center: location,
          //   zoom: 15,
          // });

          this.mapDos = new google.maps.Map(<HTMLInputElement>document.getElementById('mapDos'), {
            center: location,
            zoom: 15,
          });

          // const marker: google.maps.Marker | undefined = new google.maps.Marker({
          //   position: location,
          //   map: this.map,
          //   draggable: true,
          // });

          const markerMapaDos: google.maps.Marker | undefined = new google.maps.Marker({
            position: location,
            map: this.mapDos,
            draggable: true,
          });
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
