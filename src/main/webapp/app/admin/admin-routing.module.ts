import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ListaAdministradoresComponent } from './lista-administradores/lista-administradores.component';
import { ListaUsuariosComponent } from './lista-usuarios/lista-usuarios.component';
import { PerfilVisualizableAdminComponent } from './perfil-visualizable-admin/perfil-visualizable-admin.component';
import { PerfilVisualizableUsuarioFinalComponent } from './perfil-visualizable-usuario-final/perfil-visualizable-usuario-final.component';
import { PerfilAdminComponent } from './perfil/perfil-admin.component';
import { RegistroAdminComponent } from './registro-admin/registro-admin.component';
import { ListarStartupsAdminComponent } from './listar-startups-admin/listar-startups-admin.component';
import { ListarInscripcionesAdminComponent } from './listar-inscripciones-admin/listar-inscripciones-admin.component';
import { PerfilVisualizableStartupComponent } from './perfil-visualizable-startup/perfil-visualizable-startup.component';
import { ListarReportesComponent } from './listar-reportes/listar-reportes.component';
@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'profile-admin',
        component: PerfilAdminComponent,
        data: {
          pageTitle: 'profile-admin.home.title',
        },
      },
      {
        path: 'lista-usuarios',
        component: ListaUsuariosComponent,
        data: {
          pageTitle: 'lista-usuarios.home.title',
        },
      },
      {
        path: 'lista-startups',
        component: ListarStartupsAdminComponent,
        data: {
          pageTitle: 'lista-startups-admin.home.title',
        },
      },
      {
        path: 'lista-inscripciones',
        component: ListarInscripcionesAdminComponent,
        data: {
          pageTitle: 'lista-inscripciones-admin.home.title',
        },
      },
      {
        path: 'perfil-visualizable-usuario-final',
        component: PerfilVisualizableUsuarioFinalComponent,
        data: {
          pageTitle: 'perfil-visualizable-usuario-final.home.title',
        },
      },
      {
        path: 'lista-administradores',
        component: ListaAdministradoresComponent,
        data: {
          pageTitle: 'lista-administradores.home.title',
        },
      },
      {
        path: 'perfil-visualizable-admin',
        component: PerfilVisualizableAdminComponent,
        data: {
          pageTitle: 'perfil-visualizable-admin.home.title',
        },
      },
      {
        path: 'registro-admin',
        component: RegistroAdminComponent,
        data: {
          pageTitle: 'registro-admin.home.title',
        },
      },
      {
        path: 'perfil-visualizable-startup',
        component: PerfilVisualizableStartupComponent,
        data: {
          pageTitle: 'perfil-visualizable-admin.home.title',
        },
      },
      {
        path: 'listar-reportes',
        component: ListarReportesComponent,
        data: {
          pageTitle: 'listar-reportes.home.title',
        },
      },
      {
        path: 'user-management',
        loadChildren: () => import('./user-management/user-management.module').then(m => m.UserManagementModule),
        data: {
          pageTitle: 'userManagement.home.title',
        },
      },
      {
        path: 'docs',
        loadChildren: () => import('./docs/docs.module').then(m => m.DocsModule),
      },
      {
        path: 'configuration',
        loadChildren: () => import('./configuration/configuration.module').then(m => m.ConfigurationModule),
      },
      {
        path: 'health',
        loadChildren: () => import('./health/health.module').then(m => m.HealthModule),
      },
      {
        path: 'logs',
        loadChildren: () => import('./logs/logs.module').then(m => m.LogsModule),
      },
      {
        path: 'metrics',
        loadChildren: () => import('./metrics/metrics.module').then(m => m.MetricsModule),
      },
      {
        path: 'tracker',
        loadChildren: () => import('./tracker/tracker.module').then(m => m.TrackerModule),
      },
      /* jhipster-needle-add-admin-route - JHipster will add admin routes here */
    ]),
  ],
})
export class AdminRoutingModule {}
