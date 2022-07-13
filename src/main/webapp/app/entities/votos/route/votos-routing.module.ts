import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { VotosComponent } from '../list/votos.component';
import { VotosDetailComponent } from '../detail/votos-detail.component';
import { VotosUpdateComponent } from '../update/votos-update.component';
import { VotosRoutingResolveService } from './votos-routing-resolve.service';

const votosRoute: Routes = [
  {
    path: '',
    component: VotosComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: VotosDetailComponent,
    resolve: {
      votos: VotosRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: VotosUpdateComponent,
    resolve: {
      votos: VotosRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: VotosUpdateComponent,
    resolve: {
      votos: VotosRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(votosRoute)],
  exports: [RouterModule],
})
export class VotosRoutingModule {}
