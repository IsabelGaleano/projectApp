import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IStartups } from '../startups.model';
import { StartupsService } from '../service/startups.service';
import { StartupsDeleteDialogComponent } from '../delete/startups-delete-dialog.component';

@Component({
  selector: 'jhi-startups',
  templateUrl: './startups.component.html',
})
export class StartupsComponent implements OnInit {
  startups?: IStartups[];
  isLoading = false;

  constructor(protected startupsService: StartupsService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.startupsService.query().subscribe({
      next: (res: HttpResponse<IStartups[]>) => {
        this.isLoading = false;
        this.startups = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(_index: number, item: IStartups): number {
    return item.id!;
  }

  delete(startups: IStartups): void {
    const modalRef = this.modalService.open(StartupsDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.startups = startups;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
