import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IMovimientos } from '../movimientos.model';
import { MovimientosService } from '../service/movimientos.service';

@Component({
  templateUrl: './movimientos-delete-dialog.component.html',
})
export class MovimientosDeleteDialogComponent {
  movimientos?: IMovimientos;

  constructor(protected movimientosService: MovimientosService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.movimientosService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
