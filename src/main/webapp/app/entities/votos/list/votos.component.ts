import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IVotos } from '../votos.model';
import { VotosService } from '../service/votos.service';
import { VotosDeleteDialogComponent } from '../delete/votos-delete-dialog.component';

@Component({
  selector: 'jhi-votos',
  templateUrl: './votos.component.html',
})
export class VotosComponent implements OnInit {
  votos?: IVotos[];
  isLoading = false;

  constructor(protected votosService: VotosService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.votosService.query().subscribe({
      next: (res: HttpResponse<IVotos[]>) => {
        this.isLoading = false;
        this.votos = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(_index: number, item: IVotos): number {
    return item.id!;
  }

  delete(votos: IVotos): void {
    const modalRef = this.modalService.open(VotosDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.votos = votos;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
