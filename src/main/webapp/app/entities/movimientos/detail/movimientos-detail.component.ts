import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMovimientos } from '../movimientos.model';

@Component({
  selector: 'jhi-movimientos-detail',
  templateUrl: './movimientos-detail.component.html',
})
export class MovimientosDetailComponent implements OnInit {
  movimientos: IMovimientos | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ movimientos }) => {
      this.movimientos = movimientos;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
