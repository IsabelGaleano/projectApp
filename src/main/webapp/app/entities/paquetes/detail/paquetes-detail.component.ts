import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPaquetes } from '../paquetes.model';

@Component({
  selector: 'jhi-paquetes-detail',
  templateUrl: './paquetes-detail.component.html',
})
export class PaquetesDetailComponent implements OnInit {
  paquetes: IPaquetes | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ paquetes }) => {
      this.paquetes = paquetes;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
