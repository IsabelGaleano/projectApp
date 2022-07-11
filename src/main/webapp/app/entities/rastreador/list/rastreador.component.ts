import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IRastreador } from '../rastreador.model';
import { RastreadorService } from '../service/rastreador.service';
import { RastreadorDeleteDialogComponent } from '../delete/rastreador-delete-dialog.component';

@Component({
  selector: 'jhi-rastreador',
  templateUrl: './rastreador.component.html',
})
export class RastreadorComponent implements OnInit {
  rastreadors?: IRastreador[];
  isLoading = false;

  constructor(protected rastreadorService: RastreadorService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.rastreadorService.query().subscribe({
      next: (res: HttpResponse<IRastreador[]>) => {
        this.isLoading = false;
        this.rastreadors = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(_index: number, item: IRastreador): number {
    return item.id!;
  }

  delete(rastreador: IRastreador): void {
    const modalRef = this.modalService.open(RastreadorDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.rastreador = rastreador;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
