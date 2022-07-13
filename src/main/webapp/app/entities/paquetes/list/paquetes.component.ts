import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IPaquetes } from '../paquetes.model';
import { PaquetesService } from '../service/paquetes.service';
import { PaquetesDeleteDialogComponent } from '../delete/paquetes-delete-dialog.component';

@Component({
  selector: 'jhi-paquetes',
  templateUrl: './paquetes.component.html',
})
export class PaquetesComponent implements OnInit {
  paquetes?: IPaquetes[];
  isLoading = false;

  constructor(protected paquetesService: PaquetesService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.paquetesService.query().subscribe({
      next: (res: HttpResponse<IPaquetes[]>) => {
        this.isLoading = false;
        this.paquetes = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(_index: number, item: IPaquetes): number {
    return item.id!;
  }

  delete(paquetes: IPaquetes): void {
    const modalRef = this.modalService.open(PaquetesDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.paquetes = paquetes;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
