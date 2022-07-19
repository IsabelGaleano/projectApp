import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ListarPaquetesStartupComponent } from './listar-paquetes-startup/listar-paquetes-startup.component';
import { PagoInscripcionStartupComponent } from './pago-inscripcion-startup/pago-inscripcion-startup.component';
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
      {
        path: 'pago-inscripcion-startup',
        component: PagoInscripcionStartupComponent,
        data: {
          pageTitle: 'pago.inscripcion.startup.title',
        },
      },
      {
        path: 'listar-paquetes-startup',
        component: ListarPaquetesStartupComponent,
        data: {
          pageTitle: 'listar.paquetes.startup.title',
        },
      },
    ]),
  ],
})
export class StartupRoutingModule {}
