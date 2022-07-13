import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IDocumentos } from '../documentos.model';
import { DocumentosService } from '../service/documentos.service';

@Component({
  templateUrl: './documentos-delete-dialog.component.html',
})
export class DocumentosDeleteDialogComponent {
  documentos?: IDocumentos;

  constructor(protected documentosService: DocumentosService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.documentosService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
