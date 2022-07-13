import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { RolesUsuariosComponent } from './list/roles-usuarios.component';
import { RolesUsuariosDetailComponent } from './detail/roles-usuarios-detail.component';
import { RolesUsuariosUpdateComponent } from './update/roles-usuarios-update.component';
import { RolesUsuariosDeleteDialogComponent } from './delete/roles-usuarios-delete-dialog.component';
import { RolesUsuariosRoutingModule } from './route/roles-usuarios-routing.module';

@NgModule({
  imports: [SharedModule, RolesUsuariosRoutingModule],
  declarations: [RolesUsuariosComponent, RolesUsuariosDetailComponent, RolesUsuariosUpdateComponent, RolesUsuariosDeleteDialogComponent],
  entryComponents: [RolesUsuariosDeleteDialogComponent],
})
export class RolesUsuariosModule {}
