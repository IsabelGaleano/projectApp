import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { CategoriasComponent } from '../list/categorias.component';
import { CategoriasDetailComponent } from '../detail/categorias-detail.component';
import { CategoriasUpdateComponent } from '../update/categorias-update.component';
import { CategoriasRoutingResolveService } from './categorias-routing-resolve.service';

const categoriasRoute: Routes = [
  {
    path: '',
    component: CategoriasComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CategoriasDetailComponent,
    resolve: {
      categorias: CategoriasRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CategoriasUpdateComponent,
    resolve: {
      categorias: CategoriasRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CategoriasUpdateComponent,
    resolve: {
      categorias: CategoriasRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(categoriasRoute)],
  exports: [RouterModule],
})
export class CategoriasRoutingModule {}
