import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { MensajesComponent } from '../list/mensajes.component';
import { MensajesDetailComponent } from '../detail/mensajes-detail.component';
import { MensajesUpdateComponent } from '../update/mensajes-update.component';
import { MensajesRoutingResolveService } from './mensajes-routing-resolve.service';

const mensajesRoute: Routes = [
  {
    path: '',
    component: MensajesComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: MensajesDetailComponent,
    resolve: {
      mensajes: MensajesRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: MensajesUpdateComponent,
    resolve: {
      mensajes: MensajesRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: MensajesUpdateComponent,
    resolve: {
      mensajes: MensajesRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(mensajesRoute)],
  exports: [RouterModule],
})
export class MensajesRoutingModule {}
