import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IStartups } from '../startups.model';
import { StartupsService } from '../service/startups.service';

@Component({
  templateUrl: './startups-delete-dialog.component.html',
})
export class StartupsDeleteDialogComponent {
  startups?: IStartups;

  constructor(protected startupsService: StartupsService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.startupsService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
