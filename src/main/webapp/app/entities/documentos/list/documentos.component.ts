import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IDocumentos } from '../documentos.model';
import { DocumentosService } from '../service/documentos.service';
import { DocumentosDeleteDialogComponent } from '../delete/documentos-delete-dialog.component';

@Component({
  selector: 'jhi-documentos',
  templateUrl: './documentos.component.html',
})
export class DocumentosComponent implements OnInit {
  documentos?: IDocumentos[];
  isLoading = false;

  constructor(protected documentosService: DocumentosService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.documentosService.query().subscribe({
      next: (res: HttpResponse<IDocumentos[]>) => {
        this.isLoading = false;
        this.documentos = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(_index: number, item: IDocumentos): number {
    return item.id!;
  }

  delete(documentos: IDocumentos): void {
    const modalRef = this.modalService.open(DocumentosDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.documentos = documentos;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
