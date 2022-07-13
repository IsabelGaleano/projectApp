import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { MonederosComponent } from '../list/monederos.component';
import { MonederosDetailComponent } from '../detail/monederos-detail.component';
import { MonederosUpdateComponent } from '../update/monederos-update.component';
import { MonederosRoutingResolveService } from './monederos-routing-resolve.service';

const monederosRoute: Routes = [
  {
    path: '',
    component: MonederosComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: MonederosDetailComponent,
    resolve: {
      monederos: MonederosRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: MonederosUpdateComponent,
    resolve: {
      monederos: MonederosRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: MonederosUpdateComponent,
    resolve: {
      monederos: MonederosRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(monederosRoute)],
  exports: [RouterModule],
})
export class MonederosRoutingModule {}
