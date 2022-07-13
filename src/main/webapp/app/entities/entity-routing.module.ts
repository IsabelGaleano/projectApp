import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'usuarios',
        data: { pageTitle: 'projectApp.usuarios.home.title' },
        loadChildren: () => import('./usuarios/usuarios.module').then(m => m.UsuariosModule),
      },
      {
        path: 'startups',
        data: { pageTitle: 'projectApp.startups.home.title' },
        loadChildren: () => import('./startups/startups.module').then(m => m.StartupsModule),
      },
      {
        path: 'roles-usuarios',
        data: { pageTitle: 'projectApp.rolesUsuarios.home.title' },
        loadChildren: () => import('./roles-usuarios/roles-usuarios.module').then(m => m.RolesUsuariosModule),
      },
      {
        path: 'monederos',
        data: { pageTitle: 'projectApp.monederos.home.title' },
        loadChildren: () => import('./monederos/monederos.module').then(m => m.MonederosModule),
      },
      {
        path: 'movimientos',
        data: { pageTitle: 'projectApp.movimientos.home.title' },
        loadChildren: () => import('./movimientos/movimientos.module').then(m => m.MovimientosModule),
      },
      {
        path: 'codigos',
        data: { pageTitle: 'projectApp.codigos.home.title' },
        loadChildren: () => import('./codigos/codigos.module').then(m => m.CodigosModule),
      },
      {
        path: 'inscripciones',
        data: { pageTitle: 'projectApp.inscripciones.home.title' },
        loadChildren: () => import('./inscripciones/inscripciones.module').then(m => m.InscripcionesModule),
      },
      {
        path: 'planes-inversion',
        data: { pageTitle: 'projectApp.planesInversion.home.title' },
        loadChildren: () => import('./planes-inversion/planes-inversion.module').then(m => m.PlanesInversionModule),
      },
      {
        path: 'notificaciones',
        data: { pageTitle: 'projectApp.notificaciones.home.title' },
        loadChildren: () => import('./notificaciones/notificaciones.module').then(m => m.NotificacionesModule),
      },
      {
        path: 'categorias',
        data: { pageTitle: 'projectApp.categorias.home.title' },
        loadChildren: () => import('./categorias/categorias.module').then(m => m.CategoriasModule),
      },
      {
        path: 'paquetes',
        data: { pageTitle: 'projectApp.paquetes.home.title' },
        loadChildren: () => import('./paquetes/paquetes.module').then(m => m.PaquetesModule),
      },
      {
        path: 'donaciones-paquetes',
        data: { pageTitle: 'projectApp.donacionesPaquetes.home.title' },
        loadChildren: () => import('./donaciones-paquetes/donaciones-paquetes.module').then(m => m.DonacionesPaquetesModule),
      },
      {
        path: 'rastreador',
        data: { pageTitle: 'projectApp.rastreador.home.title' },
        loadChildren: () => import('./rastreador/rastreador.module').then(m => m.RastreadorModule),
      },
      {
        path: 'documentos',
        data: { pageTitle: 'projectApp.documentos.home.title' },
        loadChildren: () => import('./documentos/documentos.module').then(m => m.DocumentosModule),
      },
      {
        path: 'votos',
        data: { pageTitle: 'projectApp.votos.home.title' },
        loadChildren: () => import('./votos/votos.module').then(m => m.VotosModule),
      },
      {
        path: 'comentarios',
        data: { pageTitle: 'projectApp.comentarios.home.title' },
        loadChildren: () => import('./comentarios/comentarios.module').then(m => m.ComentariosModule),
      },
      {
        path: 'mensajes',
        data: { pageTitle: 'projectApp.mensajes.home.title' },
        loadChildren: () => import('./mensajes/mensajes.module').then(m => m.MensajesModule),
      },
      {
        path: 'facturas',
        data: { pageTitle: 'projectApp.facturas.home.title' },
        loadChildren: () => import('./facturas/facturas.module').then(m => m.FacturasModule),
      },
      {
        path: 'reuniones',
        data: { pageTitle: 'projectApp.reuniones.home.title' },
        loadChildren: () => import('./reuniones/reuniones.module').then(m => m.ReunionesModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
