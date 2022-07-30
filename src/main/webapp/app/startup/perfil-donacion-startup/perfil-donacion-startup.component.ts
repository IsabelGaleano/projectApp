import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PerfilDonacionStartupPService } from './perfil-donacion-startup.service';

@Component({
  selector: 'jhi-perfil-donacion-startup',
  templateUrl: './perfil-donacion-startup.component.html',
})
export class PerfilDonacionStartupComponent {
  donacionPaquete: any;
  paquete: any;
  startup: any;
  usuario: any;

  constructor(private router: Router, private perfilService: PerfilDonacionStartupPService) {
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
  }

  prueba(): void {
    console.warn(this.usuario);
  }
}
