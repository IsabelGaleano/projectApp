import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PerfilStartupComponent } from './perfil-startup/perfil-startup.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'perfil-startup',
        component: PerfilStartupComponent,
        data: {
          pageTitle: 'startup.home.title',
        },
      },
    ]),
  ],
})
export class StartupRoutingModule {}
