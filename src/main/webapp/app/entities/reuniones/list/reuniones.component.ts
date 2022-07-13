import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IReuniones } from '../reuniones.model';
import { ReunionesService } from '../service/reuniones.service';
import { ReunionesDeleteDialogComponent } from '../delete/reuniones-delete-dialog.component';

@Component({
  selector: 'jhi-reuniones',
  templateUrl: './reuniones.component.html',
})
export class ReunionesComponent implements OnInit {
  reuniones?: IReuniones[];
  isLoading = false;

  constructor(protected reunionesService: ReunionesService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.reunionesService.query().subscribe({
      next: (res: HttpResponse<IReuniones[]>) => {
        this.isLoading = false;
        this.reuniones = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(_index: number, item: IReuniones): number {
    return item.id!;
  }

  delete(reuniones: IReuniones): void {
    const modalRef = this.modalService.open(ReunionesDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.reuniones = reuniones;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
