import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IRastreador } from '../rastreador.model';
import { RastreadorService } from '../service/rastreador.service';

@Component({
  templateUrl: './rastreador-delete-dialog.component.html',
})
export class RastreadorDeleteDialogComponent {
  rastreador?: IRastreador;

  constructor(protected rastreadorService: RastreadorService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.rastreadorService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
