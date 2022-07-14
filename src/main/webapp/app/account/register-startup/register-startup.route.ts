import { Route } from '@angular/router';

import { RegisterStartupComponent } from './register-startup.component';

export const registerStartupRoute: Route = {
  path: 'register-startup',
  component: RegisterStartupComponent,
  data: {
    pageTitle: 'register-startup.title',
  },
};
