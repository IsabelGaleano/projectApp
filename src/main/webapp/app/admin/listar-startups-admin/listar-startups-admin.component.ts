import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ListarStartupsAdminService } from './listar-startups-admin.service';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'jhi-listar-startups-admin',
  templateUrl: './listar-startups-admin.component.html',
  styleUrls: ['./listar-startups-admin.component.scss'],
})
export class ListarStartupsAdminComponent implements OnInit {
  startups: any[] = [];
  // show:boolean;

  constructor(private listadoService: ListarStartupsAdminService, private router: Router) {}

  ngOnInit(): void {
    /* eslint-disable no-console */
    console.log(this.listadoService.ListarStartupsAdmin());
    this.listadoService.ListarStartupsAdmin().subscribe((data: any) => {
      if (data != null) {
        data.forEach((startup: any) => {
          this.startups.push(startup);
        });
      }
    });
  }

  activarStartup(event: Event): void {
    const value: string = (event.target as HTMLInputElement).value.toString();

    const idXestado = value.split(',', 2);

    if (idXestado[1] === 'Inactivo') {
      this.listadoService.updateStartupsEstado(idXestado[0], 'Activo').subscribe(() => {
        window.location.reload();
      });
    }
  }

  desactivarStartup(event: Event): void {
    const value: string = (event.target as HTMLInputElement).value.toString();

    const idXestado = value.split(',', 2);

    if (idXestado[1] === 'Activo') {
      this.listadoService.updateStartupsEstado(idXestado[0], 'Inactivo').subscribe(() => {
        window.location.reload();
      });
    }
  }

  redireccionarPerfilComercialStartup(correoStartup: string): void {
    localStorage.setItem('correoStartup', correoStartup);

    this.router.navigate(['/perfil-comercial-startup']);
  }

  redireccionarPerfilVisualizableStartup(correoStartup: string): void {
    localStorage.setItem('correoStartupVisualizable', correoStartup);

    this.router.navigate(['/admin/perfil-visualizable-startup']);
  }
}
