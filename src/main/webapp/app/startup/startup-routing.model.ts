import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ListarPaquetesStartupComponent } from './listar-paquetes-startup/listar-paquetes-startup.component';
import { PagoInscripcionStartupComponent } from './pago-inscripcion-startup/pago-inscripcion-startup.component';
import { PerfilStartupComponent } from './perfil-startup/perfil-startup.component';
import { PlanInscripcionStartupComponent } from './plan-inscripcion-startup/plan-inscripcion-startup.component';
import { RegistroPlanInversionComponent } from './registro-plan-inversion/registro-plan-inversion.component';
import { ListaPlanesInversionComponent } from './lista-planes-inversion/lista-planes-inversion.component';
import { ActualizarPlanInversionComponent } from './actualizar-plan-inversion/actualizar-plan-inversion.component';
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
        path: 'registro-plan-inversion',
        component: RegistroPlanInversionComponent,
        data: {
          pageTitle: 'registro.plan.inversion.title',
        },
      },
      {
        path: 'lista-planes-inversion',
        component: ListaPlanesInversionComponent,
        data: {
          pageTitle: 'lista.plan.inversion.title',
        },
      },
      {
        path: 'listar-paquetes-startup',
        component: ListarPaquetesStartupComponent,
        data: {
          pageTitle: 'listar.paquetes.startup.title',
        },
      },
      {
        path: 'actualizar-plan-inversion/:id',
        component: ActualizarPlanInversionComponent,
        data: {
          pageTitle: 'actualizar.plan.inversion.title',
        },
      },
    ]),
  ],
})
export class StartupRoutingModule {}
