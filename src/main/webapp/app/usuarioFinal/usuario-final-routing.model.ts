import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PerfilUsuarioFinalComponent } from './perfil/perfil-usuario-final.component';
import { ListaDonacionesUsuarioComponent } from './lista-donaciones-usuario/lista-donaciones-usuario.component';
import { CommonModule } from '@angular/common';
import { PerfilDonacionUsuarioComponent } from './perfil-donacion-usuario/perfil-donacion-usuario.component';
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
    ]),
  ],
})
export class UsuarioFinalRoutingModule {}
