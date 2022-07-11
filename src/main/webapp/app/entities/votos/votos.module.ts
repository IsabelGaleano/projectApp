import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { VotosComponent } from './list/votos.component';
import { VotosDetailComponent } from './detail/votos-detail.component';
import { VotosUpdateComponent } from './update/votos-update.component';
import { VotosDeleteDialogComponent } from './delete/votos-delete-dialog.component';
import { VotosRoutingModule } from './route/votos-routing.module';

@NgModule({
  imports: [SharedModule, VotosRoutingModule],
  declarations: [VotosComponent, VotosDetailComponent, VotosUpdateComponent, VotosDeleteDialogComponent],
  entryComponents: [VotosDeleteDialogComponent],
})
export class VotosModule {}
