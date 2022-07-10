import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { INotificaciones } from '../notificaciones.model';
import { NotificacionesService } from '../service/notificaciones.service';

@Component({
  templateUrl: './notificaciones-delete-dialog.component.html',
})
export class NotificacionesDeleteDialogComponent {
  notificaciones?: INotificaciones;

  constructor(protected notificacionesService: NotificacionesService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.notificacionesService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
