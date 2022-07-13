import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IMensajes } from '../mensajes.model';
import { MensajesService } from '../service/mensajes.service';

@Component({
  templateUrl: './mensajes-delete-dialog.component.html',
})
export class MensajesDeleteDialogComponent {
  mensajes?: IMensajes;

  constructor(protected mensajesService: MensajesService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.mensajesService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
