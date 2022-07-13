import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PerfilUsuarioFinalComponent } from './perfil/perfil-usuario-final.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'perfil-usuario-final',
        component: PerfilUsuarioFinalComponent,
        data: {
          pageTitle: 'usuario-final.home.title',
        },
      },
    ]),
  ],
})
export class UsuarioFinalRoutingModule {}
