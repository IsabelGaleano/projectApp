import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { MonederosComponent } from './list/monederos.component';
import { MonederosDetailComponent } from './detail/monederos-detail.component';
import { MonederosUpdateComponent } from './update/monederos-update.component';
import { MonederosDeleteDialogComponent } from './delete/monederos-delete-dialog.component';
import { MonederosRoutingModule } from './route/monederos-routing.module';

@NgModule({
  imports: [SharedModule, MonederosRoutingModule],
  declarations: [MonederosComponent, MonederosDetailComponent, MonederosUpdateComponent, MonederosDeleteDialogComponent],
  entryComponents: [MonederosDeleteDialogComponent],
})
export class MonederosModule {}
