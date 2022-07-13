import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IStartups } from '../startups.model';

@Component({
  selector: 'jhi-startups-detail',
  templateUrl: './startups-detail.component.html',
})
export class StartupsDetailComponent implements OnInit {
  startups: IStartups | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ startups }) => {
      this.startups = startups;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
