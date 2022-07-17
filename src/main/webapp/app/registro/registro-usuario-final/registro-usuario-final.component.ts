import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { RegistroUsuarioFinalService } from './registro-usuario-final.service';

import { EMAIL_ALREADY_USED_TYPE, LOGIN_ALREADY_USED_TYPE } from 'app/config/error.constants';
@Component({
  selector: 'jhi-registro-usuario-final',
  templateUrl: './registro-usuario-final.component.html',
})
export class RegistroUsuarioFinalComponent implements OnInit {
  doNotMatch = false;
  error = false;
  errorEmailExists = false;
  errorUserExists = false;
  success = false;
  componente = {
    nombre: '',
    cedula: '',
    primer_apellido: '',
    segundo_apellido: '',
    correo_electronico: '',
    genero: 'test',
    telefono: '',
    fecha_nacimiento: new Date(0),
    latitud_direccion: 'test',
    longitud_direccion: 'test',
    imagen_url: '',
    tipoU_usuario_final: 'UsuarioFinal',
    contrasennia: '',
    estado: '',
    id_monedero_id: 1,
    id_rol_id: 1,
  };
  submitted = false;

  constructor(private registroUsuarioFinalService: RegistroUsuarioFinalService) {}

  ngOnInit(): void {
    const data = {};
  }

  createUsuarioFinal(): void {
    // const nombre = this.componente.nombre;
    // const cedula = this.componente.cedula;
    // const primer_apellido = this.componente.primer_apellido;
    // const segundo_apellido = this.componente.segundo_apellido;
    // const correo_electronico = this.componente.correo_electronico;
    // const genero = this.componente.genero;
    // const telefono = this.componente.telefono;
    // const fecha_nacimiento = this.componente.fecha_nacimiento.toString();
    // const latitud_direccion = this.componente.latitud_direccion;
    // const longitud_direccion = this.componente.longitud_direccion;
    // const imagen_url = this.componente.imagen_url;
    // const tipo_usuario_final = 'UsuarioFinal';
    // const contrasennia = this.componente.contrasennia;
    // const estado = 'Pendiente';
    // const id_monedero_id = 1;
    // const id_rol_id = 1
    const nombre = 'test';
    const cedula = 'test';
    const primer_apellido = 'test';
    const segundo_apellido = 'test';
    const correo_electronico = 'david@rodriguezcoto.com';
    const genero = 'test';
    const telefono = 'test';
    const fecha_nacimiento = 'test';
    const latitud_direccion = 'test';
    const longitud_direccion = 'test';
    const imagen_url = 'test';
    const tipo_usuario_final = 'UsuarioFinal';
    const contrasennia = 'test';
    const estado = 'Pendiente';
    const id_monedero_id = 1;
    const id_rol_id = 1;
    // this.registroUsuarioFinalService.save({cedula,correo_electronico,contrasennia, estado, id_monedero_id, id_rol_id}).subscribe({ next: () => (this.success = true), error: response => this.processError(response) });
  }

  private processError(response: HttpErrorResponse): void {
    if (response.status === 400 && response.error.type === LOGIN_ALREADY_USED_TYPE) {
      this.errorUserExists = true;
    } else if (response.status === 400 && response.error.type === EMAIL_ALREADY_USED_TYPE) {
      this.errorEmailExists = true;
    } else {
      this.error = true;
    }
  }
}
