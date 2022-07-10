import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { CodigosComponent } from './list/codigos.component';
import { CodigosDetailComponent } from './detail/codigos-detail.component';
import { CodigosUpdateComponent } from './update/codigos-update.component';
import { CodigosDeleteDialogComponent } from './delete/codigos-delete-dialog.component';
import { CodigosRoutingModule } from './route/codigos-routing.module';

@NgModule({
  imports: [SharedModule, CodigosRoutingModule],
  declarations: [CodigosComponent, CodigosDetailComponent, CodigosUpdateComponent, CodigosDeleteDialogComponent],
  entryComponents: [CodigosDeleteDialogComponent],
})
export class CodigosModule {}
