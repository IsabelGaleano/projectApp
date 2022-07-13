import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IVotos } from '../votos.model';

@Component({
  selector: 'jhi-votos-detail',
  templateUrl: './votos-detail.component.html',
})
export class VotosDetailComponent implements OnInit {
  votos: IVotos | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ votos }) => {
      this.votos = votos;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
