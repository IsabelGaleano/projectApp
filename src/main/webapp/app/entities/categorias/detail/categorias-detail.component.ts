import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICategorias } from '../categorias.model';

@Component({
  selector: 'jhi-categorias-detail',
  templateUrl: './categorias-detail.component.html',
})
export class CategoriasDetailComponent implements OnInit {
  categorias: ICategorias | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ categorias }) => {
      this.categorias = categorias;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
