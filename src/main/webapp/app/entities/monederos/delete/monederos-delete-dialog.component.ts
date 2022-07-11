import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IMonederos } from '../monederos.model';
import { MonederosService } from '../service/monederos.service';

@Component({
  templateUrl: './monederos-delete-dialog.component.html',
})
export class MonederosDeleteDialogComponent {
  monederos?: IMonederos;

  constructor(protected monederosService: MonederosService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.monederosService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
