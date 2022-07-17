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

        this.usuario.fechaNacimiento = this.datePipe.transform(this.usuario.fechaNacimiento, 'yyyy-MM-dd');
      }

      console.warn(this.usuario);
    });
  }
}
