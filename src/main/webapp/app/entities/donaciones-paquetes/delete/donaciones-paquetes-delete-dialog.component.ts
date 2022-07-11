import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IDonacionesPaquetes } from '../donaciones-paquetes.model';
import { DonacionesPaquetesService } from '../service/donaciones-paquetes.service';

@Component({
  templateUrl: './donaciones-paquetes-delete-dialog.component.html',
})
export class DonacionesPaquetesDeleteDialogComponent {
  donacionesPaquetes?: IDonacionesPaquetes;

  constructor(protected donacionesPaquetesService: DonacionesPaquetesService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.donacionesPaquetesService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
