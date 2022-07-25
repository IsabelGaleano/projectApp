import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { StartupsPorCategoriaService } from './startups-por-categoria.service';

@Component({
  selector: 'jhi-startups-por-categoria',
  templateUrl: './startups-por-categoria.component.html',
  styleUrls: ['./startups-por-categoria.component.scss'],
})
export class StartupsPorCategoriaComponent implements OnInit {
  categoria!: string | null;
  startups: Array<any> = [];
  startupsExistentes = false;

  constructor(private startupsPorCategoria: StartupsPorCategoriaService, private router: Router) {
    console.warn('dfs');
  }

  ngOnInit(): void {
    this.categoria = localStorage.getItem('nombreCategoria');
    console.warn(this.categoria);

    this.startupsPorCategoria.getStartupsPorCategoria(this.categoria).subscribe((data: any) => {
      // this.startups = data;

      for (let i = 0; i < data.length; i++) {
        if (!data[i].descripcionCorta) {
          data[i].descripcionCorta = 'Sin descripción corta registrada';
        }

        this.startups.push(data[i]);
      }

      if (data.length > 0) {
        this.startupsExistentes = true;
      }
    });
  }

  redireccionarAPerfilStartup(correoStartup: string): void {
    localStorage.setItem('correoStartup', correoStartup);

    console.warn(correoStartup);

    this.router.navigate(['/perfil-comercial-startup']);
  }
}
