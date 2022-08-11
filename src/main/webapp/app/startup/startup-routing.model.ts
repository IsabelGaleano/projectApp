import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ListarPaquetesStartupComponent } from './listar-paquetes-startup/listar-paquetes-startup.component';
import { PagoInscripcionStartupComponent } from './pago-inscripcion-startup/pago-inscripcion-startup.component';
import { PerfilStartupComponent } from './perfil-startup/perfil-startup.component';
import { PlanInscripcionStartupComponent } from './plan-inscripcion-startup/plan-inscripcion-startup.component';
import { RegistroPlanInversionComponent } from './registro-plan-inversion/registro-plan-inversion.component';
import { ListaPlanesInversionComponent } from './lista-planes-inversion/lista-planes-inversion.component';
import { RegistrarPaquetesStartupComponent } from './registrar-paquetes-startup/registrar-paquetes-startup.component';
import { UpdatePaqueteStartupComponent } from './actualizar-paquete-startup/actualizar-paquete-startup.component';
import { ListaDonacionesStartupComponent } from './lista-donaciones-startup/lista-donaciones-startup.component';
import { RegistroEnvioPaquetesComponent } from './registro-envio-paquetes/registro-envio-paquetes.component';
import { PagoPaqueteStartupComponent } from './pago-paquete-startup/pago-paquete-startup.component';
import { PagoFinalPaquetesComponent } from './pago-final-paquetes/pago-final-paquetes.component';
import { PerfilDonacionStartupComponent } from './perfil-donacion-startup/perfil-donacion-startup.component';
import { ListaReunionesStartupComponent } from './lista-reuniones-startup/lista-reuniones-startup.component';
import { VisualizarReunionStartupComponent } from './visualizar-reunion-startup/visualizar-reunion-startup.component';
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
        path: 'registrar-paquetes-startup',
        component: RegistrarPaquetesStartupComponent,
        data: {
          pageTitle: 'registrar.paquetes.startup.title',
        },
      },
      {
        path: 'actualizar-paquete-startup',
        component: UpdatePaqueteStartupComponent,
        data: {
          pageTitle: 'actualizar.paquete.startup.title',
        },
      },
      {
        path: 'lista-donaciones-startup',
        component: ListaDonacionesStartupComponent,
        data: {
          pageTitle: 'lista.donaciones.startup.title',
        },
      },
      {
        path: 'registro-envio-paquetes',
        component: RegistroEnvioPaquetesComponent,
        data: {
          pageTitle: 'registro.envio.paquetes.title',
        },
      },
      {
        path: 'pago-paquete-startup',
        component: PagoPaqueteStartupComponent,
        data: {
          pageTitle: 'pago.paquete.startup.title',
        },
      },
      {
        path: 'pago-final-paquetes',
        component: PagoFinalPaquetesComponent,
        data: {
          pageTitle: 'pago.final.paquetes.title',
        },
      },
      {
        path: 'perfil-donacion-startup',
        component: PerfilDonacionStartupComponent,
        data: {
          pageTitle: 'perfil.donacion.startup.title',
        },
      },
      {
        path: 'lista-reuniones-startup',
        component: ListaReunionesStartupComponent,
        data: {
          pageTitle: 'lista.reuniones.startup.title',
        },
      },
      {
        path: 'visualizar-reunion-startup',
        component: VisualizarReunionStartupComponent,
        data: {
          pageTitle: 'visualizar.reunion.startup.title',
        },
      },
    ]),
  ],
})
export class StartupRoutingModule {}
