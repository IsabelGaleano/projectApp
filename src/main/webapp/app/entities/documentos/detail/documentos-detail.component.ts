import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDocumentos } from '../documentos.model';

@Component({
  selector: 'jhi-documentos-detail',
  templateUrl: './documentos-detail.component.html',
})
export class DocumentosDetailComponent implements OnInit {
  documentos: IDocumentos | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ documentos }) => {
      this.documentos = documentos;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
