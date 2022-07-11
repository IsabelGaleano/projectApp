import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { StartupsComponent } from './list/startups.component';
import { StartupsDetailComponent } from './detail/startups-detail.component';
import { StartupsUpdateComponent } from './update/startups-update.component';
import { StartupsDeleteDialogComponent } from './delete/startups-delete-dialog.component';
import { StartupsRoutingModule } from './route/startups-routing.module';

@NgModule({
  imports: [SharedModule, StartupsRoutingModule],
  declarations: [StartupsComponent, StartupsDetailComponent, StartupsUpdateComponent, StartupsDeleteDialogComponent],
  entryComponents: [StartupsDeleteDialogComponent],
})
export class StartupsModule {}
