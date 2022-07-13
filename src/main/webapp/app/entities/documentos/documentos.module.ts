import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { DocumentosComponent } from './list/documentos.component';
import { DocumentosDetailComponent } from './detail/documentos-detail.component';
import { DocumentosUpdateComponent } from './update/documentos-update.component';
import { DocumentosDeleteDialogComponent } from './delete/documentos-delete-dialog.component';
import { DocumentosRoutingModule } from './route/documentos-routing.module';

@NgModule({
  imports: [SharedModule, DocumentosRoutingModule],
  declarations: [DocumentosComponent, DocumentosDetailComponent, DocumentosUpdateComponent, DocumentosDeleteDialogComponent],
  entryComponents: [DocumentosDeleteDialogComponent],
})
export class DocumentosModule {}
