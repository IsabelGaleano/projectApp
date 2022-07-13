import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { CategoriasComponent } from './list/categorias.component';
import { CategoriasDetailComponent } from './detail/categorias-detail.component';
import { CategoriasUpdateComponent } from './update/categorias-update.component';
import { CategoriasDeleteDialogComponent } from './delete/categorias-delete-dialog.component';
import { CategoriasRoutingModule } from './route/categorias-routing.module';

@NgModule({
  imports: [SharedModule, CategoriasRoutingModule],
  declarations: [CategoriasComponent, CategoriasDetailComponent, CategoriasUpdateComponent, CategoriasDeleteDialogComponent],
  entryComponents: [CategoriasDeleteDialogComponent],
})
export class CategoriasModule {}
