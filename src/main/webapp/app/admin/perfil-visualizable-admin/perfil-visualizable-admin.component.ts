import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { ListaAdministradoresService } from '../lista-administradores/lista-administradores.service';
@Component({
  selector: 'jhi-perfil-visualizable-admin',
  templateUrl: './perfil-visualizable-admin.component.html',
  styleUrls: ['./perfil-visualizable-admin.component.scss'],
})
export class PerfilVisualizableAdminComponent implements OnInit {
  usuario: any;
  correoSession?: string;

  constructor(private appService: ListaAdministradoresService, private datePipe: DatePipe) {}

  ngOnInit(): void {
    console.warn(localStorage.getItem('correoSession'));

    this.correoSession = localStorage.getItem('correoSession') as string;

    this.appService.getUsuariosByCorreo(this.correoSession).subscribe((user: any) => {
      if (user !== undefined) {
        this.usuario = user;

        if (!this.usuario.nombre || this.usuario.nombre === ' ') {
          this.usuario.nombre = 'No existe un nombre reigstrado';
        }

        if (!this.usuario.cedula || this.usuario.cedula === ' ') {
          this.usuario.cedula = 'No existe una cédula reigstrada';
        }

        if (!this.usuario.primerApellido || this.usuario.primerApellido === ' ') {
          this.usuario.primerApellido = 'No existe un primer apellido reigstrado';
        }

        if (!this.usuario.segundoApellido || this.usuario.segundoApellido === ' ') {
          this.usuario.segundoApellido = 'No existe un segundo apellido reigstrado';
        }

        if (!this.usuario.correoElectronico || this.usuario.correoElectronico === ' ') {
          this.usuario.correoElectronico = 'No existe un correo electrónico reigstrado';
        }

        if (!this.usuario.genero || this.usuario.genero === ' ') {
          this.usuario.genero = 'No existe un género reigstrado';
        }

        if (!this.usuario.telefono || this.usuario.telefono === ' ') {
          this.usuario.telefono = 'No existe un teléfono reigstrado';
        }

        if (!this.usuario.fechaNacimiento || this.usuario.fechaNacimiento === ' ') {
          this.usuario.fechaNacimiento = 'No existe una fecha de nacimiento reigstrada';
        } else {
          this.usuario.fechaNacimiento = this.datePipe.transform(this.usuario.fechaNacimiento, 'yyyy-MM-dd');
        }

        if (!this.usuario.latitudDireccion || this.usuario.latitudDireccion === ' ') {
          this.usuario.latitudDireccion = 0.0;
        }

        if (!this.usuario.longitudDireccion || this.usuario.longitudDireccion === ' ') {
          this.usuario.longitudDireccion = 0.0;
        }

        if (!this.usuario.imagenURL || this.usuario.imagenURL === ' ') {
          this.usuario.imagenURL = 'No existe una imágen reigstrada';
        }

        if (!this.usuario.tipousuario || this.usuario.tipousuario === ' ') {
          this.usuario.tipousuario = 'No existe un tipo de usuario final reigstrado';
        }

        if (!this.usuario.contrasennia || this.usuario.contrasennia === ' ') {
          this.usuario.contrasennia = 'No existe una contrasennia reigstrada';
        }

        if (!this.usuario.estado || this.usuario.estado === ' ') {
          this.usuario.estado = 'No existe un estado reigstrado';
        }

        if (!this.usuario.idMonedero) {
          const monedero = {
            id: 0,
            tipo: 'STARTUP',
            saldo: 0.0,
            estado: 'Sin estado de monedero registrado',
          };

          this.usuario.idMonedero = monedero;
        }

        if (!this.usuario.idRol) {
          const rol = {
            id: 0,
            rol: 'Sin rol registrado',
          };

          this.usuario.idRol = rol;
        }
      }

      console.warn(this.usuario);
    });
  }
}
