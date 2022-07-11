import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IMovimientos } from '../movimientos.model';
import { MovimientosService } from '../service/movimientos.service';
import { MovimientosDeleteDialogComponent } from '../delete/movimientos-delete-dialog.component';

@Component({
  selector: 'jhi-movimientos',
  templateUrl: './movimientos.component.html',
})
export class MovimientosComponent implements OnInit {
  movimientos?: IMovimientos[];
  isLoading = false;

  constructor(protected movimientosService: MovimientosService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.movimientosService.query().subscribe({
      next: (res: HttpResponse<IMovimientos[]>) => {
        this.isLoading = false;
        this.movimientos = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(_index: number, item: IMovimientos): number {
    return item.id!;
  }

  delete(movimientos: IMovimientos): void {
    const modalRef = this.modalService.open(MovimientosDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.movimientos = movimientos;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
