import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ICategorias } from '../categorias.model';
import { CategoriasService } from '../service/categorias.service';

@Component({
  templateUrl: './categorias-delete-dialog.component.html',
})
export class CategoriasDeleteDialogComponent {
  categorias?: ICategorias;

  constructor(protected categoriasService: CategoriasService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.categoriasService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
