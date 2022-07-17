import { Route } from '@angular/router';

import { VerificacionStartupComponent } from './verificacion-startup.component';

export const VerificacionStartupRoute: Route = {
  path: 'verificacion-startup',
  component: VerificacionStartupComponent,
  data: {
    pageTitle: 'verificacion-startup.title',
  },
};
