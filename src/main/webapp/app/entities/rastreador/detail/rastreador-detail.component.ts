import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IRastreador } from '../rastreador.model';

@Component({
  selector: 'jhi-rastreador-detail',
  templateUrl: './rastreador-detail.component.html',
})
export class RastreadorDetailComponent implements OnInit {
  rastreador: IRastreador | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ rastreador }) => {
      this.rastreador = rastreador;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
