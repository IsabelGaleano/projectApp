import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ReunionesComponent } from '../list/reuniones.component';
import { ReunionesDetailComponent } from '../detail/reuniones-detail.component';
import { ReunionesUpdateComponent } from '../update/reuniones-update.component';
import { ReunionesRoutingResolveService } from './reuniones-routing-resolve.service';

const reunionesRoute: Routes = [
  {
    path: '',
    component: ReunionesComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ReunionesDetailComponent,
    resolve: {
      reuniones: ReunionesRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ReunionesUpdateComponent,
    resolve: {
      reuniones: ReunionesRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ReunionesUpdateComponent,
    resolve: {
      reuniones: ReunionesRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(reunionesRoute)],
  exports: [RouterModule],
})
export class ReunionesRoutingModule {}
