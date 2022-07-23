import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ListarPaquetesStartupService } from './listar-paquetes-startup.service';

@Component({
  selector: 'jhi-listar-paquetes-startup',
  templateUrl: './listar-paquetes-startup.component.html',
})
export class ListarPaquetesStartupComponent implements OnInit {
  paquetes: any[] = [];
  // show:boolean;

  constructor(private listadoService: ListarPaquetesStartupService, private router: Router) {}

  ngOnInit(): void {
    this.listadoService.listarPaquetesStartups(sessionStorage.getItem('startupLogin')).subscribe((data: any) => {
      // this.usuarios = data;
      if (data != null) {
        data.forEach((paquete: any) => {
          this.paquetes.push(paquete);
        });
      }
    });
  }
  activar(paquete: any): void {
    paquete.estado = 'Activo';
    this.actualizarEstado(paquete);
  }
  desactivar(paquete: any): void {
    paquete.estado = 'Inactivo';
    this.actualizarEstado(paquete);
  }
  actualizarEstado(paquete: any): void {
    this.listadoService.updatePaquetesStartups(paquete, paquete.id).subscribe((data: any) => {
      location.reload();
    });
  }
}
