import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IRolesUsuarios } from '../roles-usuarios.model';
import { RolesUsuariosService } from '../service/roles-usuarios.service';

@Component({
  templateUrl: './roles-usuarios-delete-dialog.component.html',
})
export class RolesUsuariosDeleteDialogComponent {
  rolesUsuarios?: IRolesUsuarios;

  constructor(protected rolesUsuariosService: RolesUsuariosService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.rolesUsuariosService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
