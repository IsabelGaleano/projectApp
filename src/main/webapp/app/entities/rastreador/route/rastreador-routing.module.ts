import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { RastreadorComponent } from '../list/rastreador.component';
import { RastreadorDetailComponent } from '../detail/rastreador-detail.component';
import { RastreadorUpdateComponent } from '../update/rastreador-update.component';
import { RastreadorRoutingResolveService } from './rastreador-routing-resolve.service';

const rastreadorRoute: Routes = [
  {
    path: '',
    component: RastreadorComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: RastreadorDetailComponent,
    resolve: {
      rastreador: RastreadorRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: RastreadorUpdateComponent,
    resolve: {
      rastreador: RastreadorRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: RastreadorUpdateComponent,
    resolve: {
      rastreador: RastreadorRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(rastreadorRoute)],
  exports: [RouterModule],
})
export class RastreadorRoutingModule {}
