import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IPlanesInversion } from '../planes-inversion.model';
import { PlanesInversionService } from '../service/planes-inversion.service';

@Component({
  templateUrl: './planes-inversion-delete-dialog.component.html',
})
export class PlanesInversionDeleteDialogComponent {
  planesInversion?: IPlanesInversion;

  constructor(protected planesInversionService: PlanesInversionService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.planesInversionService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
