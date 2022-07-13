import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { PlanesInversionComponent } from '../list/planes-inversion.component';
import { PlanesInversionDetailComponent } from '../detail/planes-inversion-detail.component';
import { PlanesInversionUpdateComponent } from '../update/planes-inversion-update.component';
import { PlanesInversionRoutingResolveService } from './planes-inversion-routing-resolve.service';

const planesInversionRoute: Routes = [
  {
    path: '',
    component: PlanesInversionComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: PlanesInversionDetailComponent,
    resolve: {
      planesInversion: PlanesInversionRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: PlanesInversionUpdateComponent,
    resolve: {
      planesInversion: PlanesInversionRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: PlanesInversionUpdateComponent,
    resolve: {
      planesInversion: PlanesInversionRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(planesInversionRoute)],
  exports: [RouterModule],
})
export class PlanesInversionRoutingModule {}
