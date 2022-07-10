import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { MovimientosComponent } from '../list/movimientos.component';
import { MovimientosDetailComponent } from '../detail/movimientos-detail.component';
import { MovimientosUpdateComponent } from '../update/movimientos-update.component';
import { MovimientosRoutingResolveService } from './movimientos-routing-resolve.service';

const movimientosRoute: Routes = [
  {
    path: '',
    component: MovimientosComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: MovimientosDetailComponent,
    resolve: {
      movimientos: MovimientosRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: MovimientosUpdateComponent,
    resolve: {
      movimientos: MovimientosRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: MovimientosUpdateComponent,
    resolve: {
      movimientos: MovimientosRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(movimientosRoute)],
  exports: [RouterModule],
})
export class MovimientosRoutingModule {}
