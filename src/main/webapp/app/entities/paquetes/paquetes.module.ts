import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { PaquetesComponent } from './list/paquetes.component';
import { PaquetesDetailComponent } from './detail/paquetes-detail.component';
import { PaquetesUpdateComponent } from './update/paquetes-update.component';
import { PaquetesDeleteDialogComponent } from './delete/paquetes-delete-dialog.component';
import { PaquetesRoutingModule } from './route/paquetes-routing.module';

@NgModule({
  imports: [SharedModule, PaquetesRoutingModule],
  declarations: [PaquetesComponent, PaquetesDetailComponent, PaquetesUpdateComponent, PaquetesDeleteDialogComponent],
  entryComponents: [PaquetesDeleteDialogComponent],
})
export class PaquetesModule {}
