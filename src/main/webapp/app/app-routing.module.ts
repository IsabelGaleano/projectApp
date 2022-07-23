import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { errorRoute } from './layouts/error/error.route';
import { navbarRoute } from './layouts/navbar/navbar.route';
import { DEBUG_INFO_ENABLED } from 'app/app.constants';
import { Authority } from 'app/config/authority.constants';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { RegistroUsuarioFinalComponent } from 'app/registro/registro-usuario-final/registro-usuario-final.component';
import { PasswordRecoveryComponent } from './password-recovery/password-recovery.component';
import {ResetPasswordComponent} from "./reset-password/reset-password.component";
import {ValidateotpComponent} from "./validateotp/validateotp.component";
import {RegistroAdicionalStartupComponent} from "./registro-adicional-startup/registro-adicional-startup.component";
import {PaquetesUpdateComponent} from "./entities/paquetes/update/paquetes-update.component";
import {CodigosComponent} from "./entities/codigos/list/codigos.component";

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
        { path: 'registroAdicionalStartup', component: RegistroAdicionalStartupComponent  },
        { path: 'codigostest', component: CodigosComponent  },
        navbarRoute,
        ...errorRoute,
      ],
      { enableTracing: DEBUG_INFO_ENABLED }
    ),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
