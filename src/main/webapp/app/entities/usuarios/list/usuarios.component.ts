import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IUsuarios } from '../usuarios.model';
import { UsuariosService } from '../service/usuarios.service';
import { UsuariosDeleteDialogComponent } from '../delete/usuarios-delete-dialog.component';

@Component({
  selector: 'jhi-usuarios',
  templateUrl: './usuarios.component.html',
})
export class UsuariosComponent implements OnInit {
  usuarios?: IUsuarios[];
  isLoading = false;

  constructor(protected usuariosService: UsuariosService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.usuariosService.query().subscribe({
      next: (res: HttpResponse<IUsuarios[]>) => {
        this.isLoading = false;
        this.usuarios = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(_index: number, item: IUsuarios): number {
    return item.id!;
  }

  delete(usuarios: IUsuarios): void {
    const modalRef = this.modalService.open(UsuariosDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.usuarios = usuarios;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
