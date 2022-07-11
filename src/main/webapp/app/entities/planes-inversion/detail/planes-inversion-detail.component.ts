import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPlanesInversion } from '../planes-inversion.model';

@Component({
  selector: 'jhi-planes-inversion-detail',
  templateUrl: './planes-inversion-detail.component.html',
})
export class PlanesInversionDetailComponent implements OnInit {
  planesInversion: IPlanesInversion | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ planesInversion }) => {
      this.planesInversion = planesInversion;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
