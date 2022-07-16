import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PerfilStartupComponent } from './perfil-startup/perfil-startup.component';
import { PlanInscripcionStartupComponent } from './plan-inscripcion-startup/plan-inscripcion-startup.component';

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
      {
        path: 'plan-inscripcion-startup',
        component: PlanInscripcionStartupComponent,
        data: {
          pageTitle: 'plan.inscripcion.startup.title',
        },
      },
    ]),
  ],
})
export class StartupRoutingModule {}
