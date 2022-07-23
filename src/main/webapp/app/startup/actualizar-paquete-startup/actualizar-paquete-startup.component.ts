import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';


import { IStartups } from 'app/entities/startups/startups.model';
import { StartupsService } from 'app/entities/startups/service/startups.service';
import {PaquetesService} from "../../entities/paquetes/service/paquetes.service";
import {IPaquetes, Paquetes} from "../../entities/paquetes/paquetes.model";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'jhi-actualizar-paquete-startup',
  templateUrl: './actualizar-paquete-startup.component.html',
})
export class UpdatePaqueteStartupComponent implements OnInit {
  isSaving = false;

  startupsSharedCollection: IStartups[] = [];
  paquetes?: IPaquetes;

  editForm = this.fb.group({
    id: [],
    nombre: [null, [Validators.minLength(1), Validators.maxLength(200)]],
    monto: [],
    descripcion: [null, [Validators.minLength(1), Validators.maxLength(300)]],
    dimensiones: [null, [Validators.minLength(1), Validators.maxLength(50)]],
    estado: [null, [Validators.minLength(1), Validators.maxLength(50)]],
  });

  constructor(
    protected paquetesService: PaquetesService,
    protected startupsService: StartupsService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder,
    protected activeModal: NgbActiveModal
  ) {
  }

  cancel(): void {
    this.activeModal.dismiss();
  }

  ngOnInit(): void {
      this.updateForm();
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const paquetes = this.createFromForm();
    if (paquetes.id !== undefined) {
      this.paquetesService.update(paquetes).subscribe( ()=> {
        this.activeModal.close('updated');
      });
    }
  }

  trackStartupsById(_index: number, item: IStartups): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPaquetes>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(): void {
    this.editForm.controls.id.setValue(this.paquetes ? this.paquetes.id : '');
    this.editForm.controls.nombre.setValue(this.paquetes ? this.paquetes.nombre : '');
    this.editForm.controls.monto.setValue(this.paquetes ? this.paquetes.monto : '');
    this.editForm.controls.descripcion.setValue(this.paquetes ? this.paquetes.descripcion : '');
    this.editForm.controls.dimensiones.setValue(this.paquetes ? this.paquetes.dimensiones : '');
    this.editForm.controls.estado.setValue(this.paquetes ? this.paquetes.estado : '');
  }

  protected loadRelationshipsOptions(): void {
    this.startupsService
      .query()
      .pipe(map((res: HttpResponse<IStartups[]>) => res.body ?? []))
      .pipe(
        map((startups: IStartups[]) =>
          this.startupsService.addStartupsToCollectionIfMissing(startups, this.editForm.get('idStartup')!.value)
        )
      )
      .subscribe((startups: IStartups[]) => (this.startupsSharedCollection = startups));
  }

  protected createFromForm(): IPaquetes {
    return {
      ...new Paquetes(),
      id: this.editForm.get(['id'])!.value,
      nombre: this.editForm.get(['nombre'])!.value,
      monto: this.editForm.get(['monto'])!.value,
      descripcion: this.editForm.get(['descripcion'])!.value,
      dimensiones: this.editForm.get(['dimensiones'])!.value,
      estado: this.editForm.get(['estado'])!.value,
      idStartup: this.paquetes?.idStartup,
    };
  }
}
