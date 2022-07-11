import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IRolesUsuarios } from '../roles-usuarios.model';
import { RolesUsuariosService } from '../service/roles-usuarios.service';
import { RolesUsuariosDeleteDialogComponent } from '../delete/roles-usuarios-delete-dialog.component';

@Component({
  selector: 'jhi-roles-usuarios',
  templateUrl: './roles-usuarios.component.html',
})
export class RolesUsuariosComponent implements OnInit {
  rolesUsuarios?: IRolesUsuarios[];
  isLoading = false;

  constructor(protected rolesUsuariosService: RolesUsuariosService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.rolesUsuariosService.query().subscribe({
      next: (res: HttpResponse<IRolesUsuarios[]>) => {
        this.isLoading = false;
        this.rolesUsuarios = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(_index: number, item: IRolesUsuarios): number {
    return item.id!;
  }

  delete(rolesUsuarios: IRolesUsuarios): void {
    const modalRef = this.modalService.open(RolesUsuariosDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.rolesUsuarios = rolesUsuarios;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
