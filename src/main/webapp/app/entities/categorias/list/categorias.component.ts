import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICategorias } from '../categorias.model';
import { CategoriasService } from '../service/categorias.service';
import { CategoriasDeleteDialogComponent } from '../delete/categorias-delete-dialog.component';

@Component({
  selector: 'jhi-categorias',
  templateUrl: './categorias.component.html',
})
export class CategoriasComponent implements OnInit {
  categorias?: ICategorias[];
  isLoading = false;

  constructor(protected categoriasService: CategoriasService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.categoriasService.query().subscribe({
      next: (res: HttpResponse<ICategorias[]>) => {
        this.isLoading = false;
        this.categorias = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(_index: number, item: ICategorias): number {
    return item.id!;
  }

  delete(categorias: ICategorias): void {
    const modalRef = this.modalService.open(CategoriasDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.categorias = categorias;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
