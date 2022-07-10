import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMonederos } from '../monederos.model';

@Component({
  selector: 'jhi-monederos-detail',
  templateUrl: './monederos-detail.component.html',
})
export class MonederosDetailComponent implements OnInit {
  monederos: IMonederos | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ monederos }) => {
      this.monederos = monederos;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
