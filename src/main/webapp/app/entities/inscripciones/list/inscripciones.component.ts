import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IInscripciones } from '../inscripciones.model';
import { InscripcionesService } from '../service/inscripciones.service';
import { InscripcionesDeleteDialogComponent } from '../delete/inscripciones-delete-dialog.component';

@Component({
  selector: 'jhi-inscripciones',
  templateUrl: './inscripciones.component.html',
})
export class InscripcionesComponent implements OnInit {
  inscripciones?: IInscripciones[];
  isLoading = false;

  constructor(protected inscripcionesService: InscripcionesService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.inscripcionesService.query().subscribe({
      next: (res: HttpResponse<IInscripciones[]>) => {
        this.isLoading = false;
        this.inscripciones = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(_index: number, item: IInscripciones): number {
    return item.id!;
  }

  delete(inscripciones: IInscripciones): void {
    const modalRef = this.modalService.open(InscripcionesDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.inscripciones = inscripciones;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
