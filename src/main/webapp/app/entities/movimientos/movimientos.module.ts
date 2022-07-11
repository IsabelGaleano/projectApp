import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { MovimientosComponent } from './list/movimientos.component';
import { MovimientosDetailComponent } from './detail/movimientos-detail.component';
import { MovimientosUpdateComponent } from './update/movimientos-update.component';
import { MovimientosDeleteDialogComponent } from './delete/movimientos-delete-dialog.component';
import { MovimientosRoutingModule } from './route/movimientos-routing.module';

@NgModule({
  imports: [SharedModule, MovimientosRoutingModule],
  declarations: [MovimientosComponent, MovimientosDetailComponent, MovimientosUpdateComponent, MovimientosDeleteDialogComponent],
  entryComponents: [MovimientosDeleteDialogComponent],
})
export class MovimientosModule {}
