import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { DonacionesPaquetesComponent } from './list/donaciones-paquetes.component';
import { DonacionesPaquetesDetailComponent } from './detail/donaciones-paquetes-detail.component';
import { DonacionesPaquetesUpdateComponent } from './update/donaciones-paquetes-update.component';
import { DonacionesPaquetesDeleteDialogComponent } from './delete/donaciones-paquetes-delete-dialog.component';
import { DonacionesPaquetesRoutingModule } from './route/donaciones-paquetes-routing.module';

@NgModule({
  imports: [SharedModule, DonacionesPaquetesRoutingModule],
  declarations: [
    DonacionesPaquetesComponent,
    DonacionesPaquetesDetailComponent,
    DonacionesPaquetesUpdateComponent,
    DonacionesPaquetesDeleteDialogComponent,
  ],
  entryComponents: [DonacionesPaquetesDeleteDialogComponent],
})
export class DonacionesPaquetesModule {}
