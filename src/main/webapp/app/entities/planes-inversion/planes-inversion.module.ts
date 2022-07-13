import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { PlanesInversionComponent } from './list/planes-inversion.component';
import { PlanesInversionDetailComponent } from './detail/planes-inversion-detail.component';
import { PlanesInversionUpdateComponent } from './update/planes-inversion-update.component';
import { PlanesInversionDeleteDialogComponent } from './delete/planes-inversion-delete-dialog.component';
import { PlanesInversionRoutingModule } from './route/planes-inversion-routing.module';

@NgModule({
  imports: [SharedModule, PlanesInversionRoutingModule],
  declarations: [
    PlanesInversionComponent,
    PlanesInversionDetailComponent,
    PlanesInversionUpdateComponent,
    PlanesInversionDeleteDialogComponent,
  ],
  entryComponents: [PlanesInversionDeleteDialogComponent],
})
export class PlanesInversionModule {}
