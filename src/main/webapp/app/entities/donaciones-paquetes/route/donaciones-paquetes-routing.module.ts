import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { DonacionesPaquetesComponent } from '../list/donaciones-paquetes.component';
import { DonacionesPaquetesDetailComponent } from '../detail/donaciones-paquetes-detail.component';
import { DonacionesPaquetesUpdateComponent } from '../update/donaciones-paquetes-update.component';
import { DonacionesPaquetesRoutingResolveService } from './donaciones-paquetes-routing-resolve.service';

const donacionesPaquetesRoute: Routes = [
  {
    path: '',
    component: DonacionesPaquetesComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: DonacionesPaquetesDetailComponent,
    resolve: {
      donacionesPaquetes: DonacionesPaquetesRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: DonacionesPaquetesUpdateComponent,
    resolve: {
      donacionesPaquetes: DonacionesPaquetesRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: DonacionesPaquetesUpdateComponent,
    resolve: {
      donacionesPaquetes: DonacionesPaquetesRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(donacionesPaquetesRoute)],
  exports: [RouterModule],
})
export class DonacionesPaquetesRoutingModule {}
