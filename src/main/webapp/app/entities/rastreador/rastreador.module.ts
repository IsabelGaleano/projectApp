import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { RastreadorComponent } from './list/rastreador.component';
import { RastreadorDetailComponent } from './detail/rastreador-detail.component';
import { RastreadorUpdateComponent } from './update/rastreador-update.component';
import { RastreadorDeleteDialogComponent } from './delete/rastreador-delete-dialog.component';
import { RastreadorRoutingModule } from './route/rastreador-routing.module';

@NgModule({
  imports: [SharedModule, RastreadorRoutingModule],
  declarations: [RastreadorComponent, RastreadorDetailComponent, RastreadorUpdateComponent, RastreadorDeleteDialogComponent],
  entryComponents: [RastreadorDeleteDialogComponent],
})
export class RastreadorModule {}
