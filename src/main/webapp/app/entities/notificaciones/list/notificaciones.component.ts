import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { INotificaciones } from '../notificaciones.model';
import { NotificacionesService } from '../service/notificaciones.service';
import { NotificacionesDeleteDialogComponent } from '../delete/notificaciones-delete-dialog.component';

@Component({
  selector: 'jhi-notificaciones',
  templateUrl: './notificaciones.component.html',
})
export class NotificacionesComponent implements OnInit {
  notificaciones?: INotificaciones[];
  isLoading = false;

  constructor(protected notificacionesService: NotificacionesService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.notificacionesService.query().subscribe({
      next: (res: HttpResponse<INotificaciones[]>) => {
        this.isLoading = false;
        this.notificaciones = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(_index: number, item: INotificaciones): number {
    return item.id!;
  }

  delete(notificaciones: INotificaciones): void {
    const modalRef = this.modalService.open(NotificacionesDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.notificaciones = notificaciones;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
