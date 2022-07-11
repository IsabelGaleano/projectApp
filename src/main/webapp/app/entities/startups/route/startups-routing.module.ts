import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { StartupsComponent } from '../list/startups.component';
import { StartupsDetailComponent } from '../detail/startups-detail.component';
import { StartupsUpdateComponent } from '../update/startups-update.component';
import { StartupsRoutingResolveService } from './startups-routing-resolve.service';

const startupsRoute: Routes = [
  {
    path: '',
    component: StartupsComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: StartupsDetailComponent,
    resolve: {
      startups: StartupsRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: StartupsUpdateComponent,
    resolve: {
      startups: StartupsRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: StartupsUpdateComponent,
    resolve: {
      startups: StartupsRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(startupsRoute)],
  exports: [RouterModule],
})
export class StartupsRoutingModule {}
