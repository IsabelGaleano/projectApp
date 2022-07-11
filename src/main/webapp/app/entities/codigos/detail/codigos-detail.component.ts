import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICodigos } from '../codigos.model';

@Component({
  selector: 'jhi-codigos-detail',
  templateUrl: './codigos-detail.component.html',
})
export class CodigosDetailComponent implements OnInit {
  codigos: ICodigos | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ codigos }) => {
      this.codigos = codigos;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
