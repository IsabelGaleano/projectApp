import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IReuniones } from '../reuniones.model';
import { ReunionesService } from '../service/reuniones.service';

@Component({
  templateUrl: './reuniones-delete-dialog.component.html',
})
export class ReunionesDeleteDialogComponent {
  reuniones?: IReuniones;

  constructor(protected reunionesService: ReunionesService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.reunionesService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
