import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { MensajesComponent } from './list/mensajes.component';
import { MensajesDetailComponent } from './detail/mensajes-detail.component';
import { MensajesUpdateComponent } from './update/mensajes-update.component';
import { MensajesDeleteDialogComponent } from './delete/mensajes-delete-dialog.component';
import { MensajesRoutingModule } from './route/mensajes-routing.module';

@NgModule({
  imports: [SharedModule, MensajesRoutingModule],
  declarations: [MensajesComponent, MensajesDetailComponent, MensajesUpdateComponent, MensajesDeleteDialogComponent],
  entryComponents: [MensajesDeleteDialogComponent],
})
export class MensajesModule {}
