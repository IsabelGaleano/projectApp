import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IMensajes } from '../mensajes.model';
import { MensajesService } from '../service/mensajes.service';
import { MensajesDeleteDialogComponent } from '../delete/mensajes-delete-dialog.component';

@Component({
  selector: 'jhi-mensajes',
  templateUrl: './mensajes.component.html',
})
export class MensajesComponent implements OnInit {
  mensajes?: IMensajes[];
  isLoading = false;

  constructor(protected mensajesService: MensajesService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.mensajesService.query().subscribe({
      next: (res: HttpResponse<IMensajes[]>) => {
        this.isLoading = false;
        this.mensajes = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(_index: number, item: IMensajes): number {
    return item.id!;
  }

  delete(mensajes: IMensajes): void {
    const modalRef = this.modalService.open(MensajesDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.mensajes = mensajes;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
