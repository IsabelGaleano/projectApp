import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMensajes } from '../mensajes.model';

@Component({
  selector: 'jhi-mensajes-detail',
  templateUrl: './mensajes-detail.component.html',
})
export class MensajesDetailComponent implements OnInit {
  mensajes: IMensajes | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ mensajes }) => {
      this.mensajes = mensajes;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
