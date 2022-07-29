import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ComunidadStartupService } from './comunidad-startup.service';

@Component({
  selector: 'jhi-comunidad-startup',
  templateUrl: './comunidad-startup.component.html',
  styleUrls: ['./comunidad-startup.component.scss'],
})
export class ComunidadStartupComponent implements OnInit {
  // startupsDesordenadas: Array<any> = [];
  startups: Array<any> = [];

  startupsExistentes = false;
  cantidadSoftware = 0;
  cantidadCocina = 0;
  cantidadHogar = 0;
  cantidadModa = 0;

  constructor(private comunidadStartupService: ComunidadStartupService, private router: Router) {}

  ngOnInit(): void {
    this.comunidadStartupService.getAllStartups().subscribe((data: any) => {
      for (let i = 0; i < data.length; i++) {
        if (!data[i].descripcionCorta) {
          data[i].descripcionCorta = 'Sin descripción corta registrada';
        }

        // eslint-disable-next-line prefer-const
        let start = data[i];

        this.comunidadStartupService.getVotosPorStartup(data[i]).subscribe(votos => {
          this.startups.push({ votos, start });
          this.bblSort();
        });
      }

      if (data.length >= 1) {
        this.startupsExistentes = true;
      }
    });

    this.comunidadStartupService.getCantidadCategoria('Software').subscribe((cantidad: number) => {
      this.cantidadSoftware = cantidad;
    });

    this.comunidadStartupService.getCantidadCategoria('Cocina').subscribe((cantidad: number) => {
      this.cantidadCocina = cantidad;
    });

    this.comunidadStartupService.getCantidadCategoria('Hogar').subscribe((cantidad: number) => {
      this.cantidadHogar = cantidad;
    });

    this.comunidadStartupService.getCantidadCategoria('Moda').subscribe((cantidad: number) => {
      this.cantidadModa = cantidad;
    });
  }

  redireccionarAPerfilStartup(correoStartup: string): void {
    localStorage.setItem('correoStartup', correoStartup);

    this.router.navigate(['/perfil-comercial-startup']);
  }

  redireccionarACategoria(nombreCategoria): void {
    localStorage.setItem('nombreCategoria', nombreCategoria);

    this.router.navigate(['/startups-por-categoria']);
  }

  bblSort(): void {
    for (let i = 0; i < this.startups.length; i++) {
      for (let j = 0; j < this.startups.length - i - 1; j++) {
        if (this.startups[j].votos < this.startups[j + 1].votos) {
          // eslint-disable-next-line prefer-const
          let temp = this.startups[j];
          this.startups[j] = this.startups[j + 1];
          this.startups[j + 1] = temp;
        }
      }
    }
  }
}
