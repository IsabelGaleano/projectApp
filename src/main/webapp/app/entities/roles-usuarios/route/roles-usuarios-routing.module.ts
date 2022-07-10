import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { RolesUsuariosComponent } from '../list/roles-usuarios.component';
import { RolesUsuariosDetailComponent } from '../detail/roles-usuarios-detail.component';
import { RolesUsuariosUpdateComponent } from '../update/roles-usuarios-update.component';
import { RolesUsuariosRoutingResolveService } from './roles-usuarios-routing-resolve.service';

const rolesUsuariosRoute: Routes = [
  {
    path: '',
    component: RolesUsuariosComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: RolesUsuariosDetailComponent,
    resolve: {
      rolesUsuarios: RolesUsuariosRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: RolesUsuariosUpdateComponent,
    resolve: {
      rolesUsuarios: RolesUsuariosRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: RolesUsuariosUpdateComponent,
    resolve: {
      rolesUsuarios: RolesUsuariosRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(rolesUsuariosRoute)],
  exports: [RouterModule],
})
export class RolesUsuariosRoutingModule {}
