import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { CodigosComponent } from '../list/codigos.component';
import { CodigosDetailComponent } from '../detail/codigos-detail.component';
import { CodigosUpdateComponent } from '../update/codigos-update.component';
import { CodigosRoutingResolveService } from './codigos-routing-resolve.service';

const codigosRoute: Routes = [
  {
    path: '',
    component: CodigosComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CodigosDetailComponent,
    resolve: {
      codigos: CodigosRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CodigosUpdateComponent,
    resolve: {
      codigos: CodigosRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CodigosUpdateComponent,
    resolve: {
      codigos: CodigosRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(codigosRoute)],
  exports: [RouterModule],
})
export class CodigosRoutingModule {}
