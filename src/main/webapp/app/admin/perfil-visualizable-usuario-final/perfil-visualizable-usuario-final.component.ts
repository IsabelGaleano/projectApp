import { Component, OnInit } from '@angular/core';

import { AppService } from '../lista-usuarios/lista-usuarios.service';

@Component({
  selector: 'jhi-perfil-visualizable-usuario-final',
  templateUrl: './perfil-visualizable-usuario-final.component.html',
  styleUrls: ['./perfil-visualizable-usuario-final.component.scss'],
})
export class PerfilVisualizableUsuarioFinalComponent implements OnInit {
  constructor(private appService: AppService) {}

  ngOnInit(): void {
    this.appService.getCorreo().subscribe(correo => {
      console.warn('Alex, este es el correo: ' + correo);
    });
  }
}
