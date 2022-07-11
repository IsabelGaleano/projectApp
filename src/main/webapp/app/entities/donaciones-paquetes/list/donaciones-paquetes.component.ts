import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IDonacionesPaquetes } from '../donaciones-paquetes.model';
import { DonacionesPaquetesService } from '../service/donaciones-paquetes.service';
import { DonacionesPaquetesDeleteDialogComponent } from '../delete/donaciones-paquetes-delete-dialog.component';

@Component({
  selector: 'jhi-donaciones-paquetes',
  templateUrl: './donaciones-paquetes.component.html',
})
export class DonacionesPaquetesComponent implements OnInit {
  donacionesPaquetes?: IDonacionesPaquetes[];
  isLoading = false;

  constructor(protected donacionesPaquetesService: DonacionesPaquetesService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.donacionesPaquetesService.query().subscribe({
      next: (res: HttpResponse<IDonacionesPaquetes[]>) => {
        this.isLoading = false;
        this.donacionesPaquetes = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(_index: number, item: IDonacionesPaquetes): number {
    return item.id!;
  }

  delete(donacionesPaquetes: IDonacionesPaquetes): void {
    const modalRef = this.modalService.open(DonacionesPaquetesDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.donacionesPaquetes = donacionesPaquetes;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
