import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { DocumentosComponent } from '../list/documentos.component';
import { DocumentosDetailComponent } from '../detail/documentos-detail.component';
import { DocumentosUpdateComponent } from '../update/documentos-update.component';
import { DocumentosRoutingResolveService } from './documentos-routing-resolve.service';

const documentosRoute: Routes = [
  {
    path: '',
    component: DocumentosComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: DocumentosDetailComponent,
    resolve: {
      documentos: DocumentosRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: DocumentosUpdateComponent,
    resolve: {
      documentos: DocumentosRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: DocumentosUpdateComponent,
    resolve: {
      documentos: DocumentosRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(documentosRoute)],
  exports: [RouterModule],
})
export class DocumentosRoutingModule {}
