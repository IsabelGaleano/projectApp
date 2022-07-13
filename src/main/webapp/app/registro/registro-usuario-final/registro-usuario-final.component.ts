import { Component, OnInit } from '@angular/core';
import { RegistroUsuarioFinalService } from './registro-usuario-final.service';

@Component({
  selector: 'jhi-registro-usuario-final',
  templateUrl: './registro-usuario-final.component.html',
})
export class RegistroUsuarioFinalComponent implements OnInit {
  componente = {
    nombre: '',
    cedula: '',
    primer_apellido: '',
    segundo_apellido: '',
    correo_electronico: '',
    genero: '',
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

  ngOnInit(): void {}

  createUsuarioFinal(): void {
    const data = {
      nombre: this.componente.nombre,
      cedula: this.componente.cedula,
      primer_apellido: this.componente.primer_apellido,
      segundo_apellido: this.componente.segundo_apellido,
      correo_electronico: this.componente.correo_electronico,
      genero: this.componente.genero,
      telefono: this.componente.telefono,
      fecha_nacimiento: this.componente.fecha_nacimiento,
      latitud_direccion: this.componente.latitud_direccion,
      longitud_direccion: this.componente.longitud_direccion,
      imagen_url: this.componente.imagen_url,
      tipo_usuario_final: 'UsuarioFinal',
      contrasennia: this.componente.contrasennia,
      estado: 'Pendiente',
      id_monedero_id: 1,
      id_rol_id: 1,
    };

    this.registroUsuarioFinalService.create(data);
  }
}
