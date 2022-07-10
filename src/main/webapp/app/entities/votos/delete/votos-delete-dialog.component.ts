import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IVotos } from '../votos.model';
import { VotosService } from '../service/votos.service';

@Component({
  templateUrl: './votos-delete-dialog.component.html',
})
export class VotosDeleteDialogComponent {
  votos?: IVotos;

  constructor(protected votosService: VotosService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.votosService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
