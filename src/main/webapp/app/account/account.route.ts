import { Routes } from '@angular/router';

import { activateRoute } from './activate/activate.route';
import { passwordRoute } from './password/password.route';
import { passwordResetFinishRoute } from './password-reset/finish/password-reset-finish.route';
import { passwordResetInitRoute } from './password-reset/init/password-reset-init.route';
import { registerRoute } from './register/register.route';
import { settingsRoute } from './settings/settings.route';
import { VerificacionCodigoUsuarioFinalRoute } from './verificacion-codigo-usuario-final/verificacion-codigo-usuario-final.route';
import { registerStartupRoute } from './register-startup/register-startup.route';
import { VerificacionStartupRoute } from './verificacion-startup/verificacion-startup.route';

const ACCOUNT_ROUTES = [
  activateRoute,
  passwordRoute,
  passwordResetFinishRoute,
  passwordResetInitRoute,
  registerRoute,
  settingsRoute,
  VerificacionCodigoUsuarioFinalRoute,
  registerStartupRoute,
  VerificacionStartupRoute,
];

export const accountState: Routes = [
  {
    path: '',
    children: ACCOUNT_ROUTES,
  },
];
