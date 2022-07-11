import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IComentarios } from '../comentarios.model';
import { ComentariosService } from '../service/comentarios.service';
import { ComentariosDeleteDialogComponent } from '../delete/comentarios-delete-dialog.component';

@Component({
  selector: 'jhi-comentarios',
  templateUrl: './comentarios.component.html',
})
export class ComentariosComponent implements OnInit {
  comentarios?: IComentarios[];
  isLoading = false;

  constructor(protected comentariosService: ComentariosService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.comentariosService.query().subscribe({
      next: (res: HttpResponse<IComentarios[]>) => {
        this.isLoading = false;
        this.comentarios = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(_index: number, item: IComentarios): number {
    return item.id!;
  }

  delete(comentarios: IComentarios): void {
    const modalRef = this.modalService.open(ComentariosDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.comentarios = comentarios;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
