import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { ReunionesComponent } from './list/reuniones.component';
import { ReunionesDetailComponent } from './detail/reuniones-detail.component';
import { ReunionesUpdateComponent } from './update/reuniones-update.component';
import { ReunionesDeleteDialogComponent } from './delete/reuniones-delete-dialog.component';
import { ReunionesRoutingModule } from './route/reuniones-routing.module';

@NgModule({
  imports: [SharedModule, ReunionesRoutingModule],
  declarations: [ReunionesComponent, ReunionesDetailComponent, ReunionesUpdateComponent, ReunionesDeleteDialogComponent],
  entryComponents: [ReunionesDeleteDialogComponent],
})
export class ReunionesModule {}
