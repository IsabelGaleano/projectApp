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
  startups!: any;
  startupsExistentes = false;

  constructor(private startupsPorCategoria: StartupsPorCategoriaService, private router: Router) {
    console.warn('dfs');
  }

  ngOnInit(): void {
    this.categoria = localStorage.getItem('nombreCategoria');
    console.warn(this.categoria);

    this.startupsPorCategoria.getStartupsPorCategoria(this.categoria).subscribe((data: any) => {
      this.startups = data;

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
