import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IPlanesInversion } from '../planes-inversion.model';
import { PlanesInversionService } from '../service/planes-inversion.service';
import { PlanesInversionDeleteDialogComponent } from '../delete/planes-inversion-delete-dialog.component';

@Component({
  selector: 'jhi-planes-inversion',
  templateUrl: './planes-inversion.component.html',
})
export class PlanesInversionComponent implements OnInit {
  planesInversions?: IPlanesInversion[];
  isLoading = false;

  constructor(protected planesInversionService: PlanesInversionService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.planesInversionService.query().subscribe({
      next: (res: HttpResponse<IPlanesInversion[]>) => {
        this.isLoading = false;
        this.planesInversions = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(_index: number, item: IPlanesInversion): number {
    return item.id!;
  }

  delete(planesInversion: IPlanesInversion): void {
    const modalRef = this.modalService.open(PlanesInversionDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.planesInversion = planesInversion;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
