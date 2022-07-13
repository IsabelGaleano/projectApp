import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ICodigos } from '../codigos.model';
import { CodigosService } from '../service/codigos.service';

@Component({
  templateUrl: './codigos-delete-dialog.component.html',
})
export class CodigosDeleteDialogComponent {
  codigos?: ICodigos;

  constructor(protected codigosService: CodigosService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.codigosService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
