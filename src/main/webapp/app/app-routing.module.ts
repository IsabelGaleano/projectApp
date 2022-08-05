import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { errorRoute } from './layouts/error/error.route';
import { navbarRoute } from './layouts/navbar/navbar.route';
import { DEBUG_INFO_ENABLED } from 'app/app.constants';
import { Authority } from 'app/config/authority.constants';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { RegistroUsuarioFinalComponent } from 'app/registro/registro-usuario-final/registro-usuario-final.component';
import { ComunidadStartupComponent } from './startup/comunidad-startup/comunidad-startup.component';
import { StartupsPorCategoriaComponent } from './startup/startups-por-categoria/startups-por-categoria.component';
import { PasswordRecoveryComponent } from './password-recovery/password-recovery.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ValidateotpComponent } from './validateotp/validateotp.component';
import { RegistroAdicionalStartupComponent } from './registro-adicional-startup/registro-adicional-startup.component';
import { PaquetesUpdateComponent } from './entities/paquetes/update/paquetes-update.component';
import { CodigosComponent } from './entities/codigos/list/codigos.component';
import { PerfilComercialStartupComponent } from './startup/perfil-comercial-startup/perfil-comercial-startup.component';
import { PagoPaqueteStartupComponent } from './startup/pago-paquete-startup/pago-paquete-startup.component';
import { RegistroEnvioPaquetesComponent } from './startup/registro-envio-paquetes/registro-envio-paquetes.component';
import { PagoFinalPaquetesComponent } from './startup/pago-final-paquetes/pago-final-paquetes.component';
import { ListaDonacionesUsuarioComponent } from './usuarioFinal/lista-donaciones-usuario/lista-donaciones-usuario.component';
import { ReunionesZoomTestComponent } from './reuniones/reuniones-zoom-test/reuniones-zoom-test.component';

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
        { path: 'registroAdicionalStartup', component: RegistroAdicionalStartupComponent },
        {
          path: 'comunidad-startup',
          data: {
            authorities: [Authority.STARTUP, Authority.ADMIN, Authority.USER],
          },
          component: ComunidadStartupComponent,
        },
        {
          path: 'startups-por-categoria',
          data: {
            authorities: [Authority.STARTUP, Authority.ADMIN, Authority.USER],
          },
          component: StartupsPorCategoriaComponent,
        },
        {
          path: 'perfil-comercial-startup',
          data: {
            authorities: [Authority.STARTUP, Authority.ADMIN, Authority.USER],
          },
          component: PerfilComercialStartupComponent,
        },
        {
          path: 'registro-envio-paquetes',
          data: {
            authorities: [Authority.STARTUP, Authority.ADMIN, Authority.USER],
          },
          component: RegistroEnvioPaquetesComponent,
        },
        {
          path: 'pago-paquete-startup',
          data: {
            authorities: [Authority.STARTUP, Authority.ADMIN, Authority.USER],
          },
          component: PagoPaqueteStartupComponent,
        },
        {
          path: 'pago-final-paquetes',
          data: {
            authorities: [Authority.STARTUP, Authority.ADMIN, Authority.USER],
          },
          component: PagoFinalPaquetesComponent,
        },
        {
          path: 'reuniones-zoom-test',
          data: {
            authorities: [Authority.STARTUP, Authority.ADMIN, Authority.USER],
          },
          component: ReunionesZoomTestComponent,
        },
        navbarRoute,
        ...errorRoute,
      ],
      { enableTracing: DEBUG_INFO_ENABLED }
    ),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
