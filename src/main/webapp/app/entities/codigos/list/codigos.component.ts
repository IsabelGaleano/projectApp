import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICodigos } from '../codigos.model';
import { CodigosService } from '../service/codigos.service';
import { CodigosDeleteDialogComponent } from '../delete/codigos-delete-dialog.component';

@Component({
  selector: 'jhi-codigos',
  templateUrl: './codigos.component.html',
})
export class CodigosComponent implements OnInit {
  codigos?: ICodigos[];
  isLoading = false;

  constructor(protected codigosService: CodigosService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.codigosService.query().subscribe({
      next: (res: HttpResponse<ICodigos[]>) => {
        this.isLoading = false;
        this.codigos = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(_index: number, item: ICodigos): number {
    return item.id!;
  }

  delete(codigos: ICodigos): void {
    const modalRef = this.modalService.open(CodigosDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.codigos = codigos;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
