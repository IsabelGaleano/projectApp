import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { PaquetesComponent } from '../list/paquetes.component';
import { PaquetesDetailComponent } from '../detail/paquetes-detail.component';
import { PaquetesUpdateComponent } from '../update/paquetes-update.component';
import { PaquetesRoutingResolveService } from './paquetes-routing-resolve.service';

const paquetesRoute: Routes = [
  {
    path: '',
    component: PaquetesComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: PaquetesDetailComponent,
    resolve: {
      paquetes: PaquetesRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: PaquetesUpdateComponent,
    resolve: {
      paquetes: PaquetesRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: PaquetesUpdateComponent,
    resolve: {
      paquetes: PaquetesRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(paquetesRoute)],
  exports: [RouterModule],
})
export class PaquetesRoutingModule {}
