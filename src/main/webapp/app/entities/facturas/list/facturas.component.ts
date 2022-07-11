import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IFacturas } from '../facturas.model';
import { FacturasService } from '../service/facturas.service';
import { FacturasDeleteDialogComponent } from '../delete/facturas-delete-dialog.component';

@Component({
  selector: 'jhi-facturas',
  templateUrl: './facturas.component.html',
})
export class FacturasComponent implements OnInit {
  facturas?: IFacturas[];
  isLoading = false;

  constructor(protected facturasService: FacturasService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.facturasService.query().subscribe({
      next: (res: HttpResponse<IFacturas[]>) => {
        this.isLoading = false;
        this.facturas = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(_index: number, item: IFacturas): number {
    return item.id!;
  }

  delete(facturas: IFacturas): void {
    const modalRef = this.modalService.open(FacturasDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.facturas = facturas;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
