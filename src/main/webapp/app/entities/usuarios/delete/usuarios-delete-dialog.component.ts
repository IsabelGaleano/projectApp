import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IUsuarios } from '../usuarios.model';
import { UsuariosService } from '../service/usuarios.service';

@Component({
  templateUrl: './usuarios-delete-dialog.component.html',
})
export class UsuariosDeleteDialogComponent {
  usuarios?: IUsuarios;

  constructor(protected usuariosService: UsuariosService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.usuariosService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
