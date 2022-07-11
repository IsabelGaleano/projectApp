import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDonacionesPaquetes } from '../donaciones-paquetes.model';

@Component({
  selector: 'jhi-donaciones-paquetes-detail',
  templateUrl: './donaciones-paquetes-detail.component.html',
})
export class DonacionesPaquetesDetailComponent implements OnInit {
  donacionesPaquetes: IDonacionesPaquetes | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ donacionesPaquetes }) => {
      this.donacionesPaquetes = donacionesPaquetes;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
