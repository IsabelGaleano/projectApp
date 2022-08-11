import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PerfilUsuarioFinalComponent } from './perfil/perfil-usuario-final.component';
import { ListaDonacionesUsuarioComponent } from './lista-donaciones-usuario/lista-donaciones-usuario.component';
import { CommonModule } from '@angular/common';
import { PerfilDonacionUsuarioComponent } from './perfil-donacion-usuario/perfil-donacion-usuario.component';
import { ListaReunionesComponent } from './lista-reuniones/lista-reuniones.component';
import { VisualizarReunionComponent } from './visualizar-reunion/visualizar-reunion.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: 'perfil-usuario-final',
        component: PerfilUsuarioFinalComponent,
        data: {
          pageTitle: 'usuario-final.home.title',
        },
      },
      {
        path: 'lista-donaciones-usuario',
        component: ListaDonacionesUsuarioComponent,
        data: {
          pageTitle: 'lista.donaciones.usuario.title',
        },
      },
      {
        path: 'perfil-donacion-usuario',
        component: PerfilDonacionUsuarioComponent,
        data: {
          pageTitle: 'perfil.donacion.usuario.title',
        },
      },
      {
        path: 'lista-reuniones-usuario',
        component: ListaReunionesComponent,
        data: {
          pageTitle: 'lista.reuniones.usuario.title',
        },
      },
      {
        path: 'visualizar-reunion',
        component: VisualizarReunionComponent,
        data: {
          pageTitle: 'visualizar.reunion.title',
        },
      },
    ]),
  ],
})
export class UsuarioFinalRoutingModule {}
