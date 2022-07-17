import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { errorRoute } from './layouts/error/error.route';
import { navbarRoute } from './layouts/navbar/navbar.route';
import { DEBUG_INFO_ENABLED } from 'app/app.constants';
import { Authority } from 'app/config/authority.constants';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { RegistroUsuarioFinalComponent } from 'app/registro/registro-usuario-final/registro-usuario-final.component';
import { PasswordRecoveryComponent } from './password-recovery/password-recovery.component';
import { ValidateotpComponent } from './validateotp/validateotp.component';
import {UsuariosUpdateComponent} from "./entities/usuarios/update/usuarios-update.component";
import {MonederosUpdateComponent} from "./entities/monederos/update/monederos-update.component";
import {RolesUsuariosUpdateComponent} from "./entities/roles-usuarios/update/roles-usuarios-update.component";
import {MonederosComponent} from "./entities/monederos/list/monederos.component";
import {RolesUsuariosComponent} from "./entities/roles-usuarios/list/roles-usuarios.component";
import {StartupsComponent} from "./entities/startups/list/startups.component";
import { CategoriasComponent } from './entities/categorias/list/categorias.component';
import {UsuariosComponent} from "./entities/usuarios/list/usuarios.component";
import {ResetPasswordComponent} from "./reset-password/reset-password.component";
import {RegistroAdicionalStartupComponent} from "./registro-adicional-startup/registro-adicional-startup.component";

@NgModule({
  imports: [
    RouterModule.forRoot(
      [
        {
          path: 'admin',
          data: {
            authorities: [Authority.ADMIN],
          },
          canActivate: [UserRouteAccessService],
          loadChildren: () => import('./admin/admin-routing.module').then(m => m.AdminRoutingModule),
        },
        {
          path: 'usuario-final',
          data: {
            authorities: [Authority.USER],
          },
          canActivate: [UserRouteAccessService],
          loadChildren: () => import('./usuarioFinal/usuario-final-routing.model').then(m => m.UsuarioFinalRoutingModule),
        },
        {
          path: 'startup',
          data: {
            authorities: [Authority.STARTUP],
          },
          canActivate: [UserRouteAccessService],
          loadChildren: () => import('./startup/startup-routing.model').then(m => m.StartupRoutingModule),
        },
        {
          path: 'account',
          loadChildren: () => import('./account/account.module').then(m => m.AccountModule),
        },
        {
          path: 'login',
          loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
        },
        { path: 'registroFinal', component: RegistroUsuarioFinalComponent },
        {
          path: '',
          loadChildren: () => import(`./entities/entity-routing.module`).then(m => m.EntityRoutingModule),
        },
        { path: 'passwordRecovery', component: PasswordRecoveryComponent },
        { path: 'resetPassword', component: ResetPasswordComponent },
        { path: 'validateotp', component: ValidateotpComponent },
        // ruta de prueba para registrar usuarios
        { path: 'temporalUserRegistry', component: UsuariosComponent },
        // ruta de prueba para registrar monederos
        { path: 'temporalMoneyRegistry', component: MonederosComponent },
        // ruta de prueba para registrar monederos
        { path: 'temporalRolRegistry', component: RolesUsuariosComponent  },
        // ruta de prueba para registrar startups
        { path: 'categoria', component: CategoriasComponent  },
        { path: 'registroAdicionalStartup', component: RegistroAdicionalStartupComponent  },
        navbarRoute,
        ...errorRoute,
      ],
      { enableTracing: DEBUG_INFO_ENABLED }
    ),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
