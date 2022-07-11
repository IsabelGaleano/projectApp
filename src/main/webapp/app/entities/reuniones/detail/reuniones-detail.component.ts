import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IReuniones } from '../reuniones.model';

@Component({
  selector: 'jhi-reuniones-detail',
  templateUrl: './reuniones-detail.component.html',
})
export class ReunionesDetailComponent implements OnInit {
  reuniones: IReuniones | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ reuniones }) => {
      this.reuniones = reuniones;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
