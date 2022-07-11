import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IMonederos } from '../monederos.model';
import { MonederosService } from '../service/monederos.service';
import { MonederosDeleteDialogComponent } from '../delete/monederos-delete-dialog.component';

@Component({
  selector: 'jhi-monederos',
  templateUrl: './monederos.component.html',
})
export class MonederosComponent implements OnInit {
  monederos?: IMonederos[];
  isLoading = false;

  constructor(protected monederosService: MonederosService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.monederosService.query().subscribe({
      next: (res: HttpResponse<IMonederos[]>) => {
        this.isLoading = false;
        this.monederos = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(_index: number, item: IMonederos): number {
    return item.id!;
  }

  delete(monederos: IMonederos): void {
    const modalRef = this.modalService.open(MonederosDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.monederos = monederos;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
