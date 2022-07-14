import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ListaUsuariosComponent } from './lista-usuarios/lista-usuarios.component';
import { PerfilAdminComponent } from './perfil/perfil-admin.component';

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
