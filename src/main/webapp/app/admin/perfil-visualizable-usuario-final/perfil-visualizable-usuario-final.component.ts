import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
// import { Usuarios } from 'app/entities/usuarios/usuarios.model';

import { AppService } from '../lista-usuarios/lista-usuarios.service';

@Component({
  selector: 'jhi-perfil-visualizable-usuario-final',
  templateUrl: './perfil-visualizable-usuario-final.component.html',
  styleUrls: ['./perfil-visualizable-usuario-final.component.scss'],
})
export class PerfilVisualizableUsuarioFinalComponent implements OnInit {
  usuario: any;
  correoSession?: string;

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
        this.usuario = user;

        this.usuario.fechaNacimiento = this.datePipe.transform(this.usuario.fechaNacimiento, 'yyyy-MM-dd');
      }

      console.warn(this.usuario);
    });
  }
}
