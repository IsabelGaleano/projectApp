import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IPaquetes } from '../paquetes.model';
import { PaquetesService } from '../service/paquetes.service';

@Component({
  templateUrl: './paquetes-delete-dialog.component.html',
})
export class PaquetesDeleteDialogComponent {
  paquetes?: IPaquetes;

  constructor(protected paquetesService: PaquetesService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.paquetesService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
