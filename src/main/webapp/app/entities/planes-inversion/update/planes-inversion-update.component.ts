import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IPlanesInversion, PlanesInversion } from '../planes-inversion.model';
import { PlanesInversionService } from '../service/planes-inversion.service';
import { IStartups } from 'app/entities/startups/startups.model';
import { StartupsService } from 'app/entities/startups/service/startups.service';

@Component({
  selector: 'jhi-planes-inversion-update',
  templateUrl: './planes-inversion-update.component.html',
})
export class PlanesInversionUpdateComponent implements OnInit {
  isSaving = false;

  startupsSharedCollection: IStartups[] = [];

  editForm = this.fb.group({
    id: [],
    nombre: [null, [Validators.minLength(1), Validators.maxLength(100)]],
    monto: [],
    descripcion: [null, [Validators.minLength(1), Validators.maxLength(300)]],
    beneficios: [null, [Validators.minLength(1), Validators.maxLength(4000)]],
    porcentajeEmpresarial: [],
    estado: [null, [Validators.minLength(1), Validators.maxLength(50)]],
    idStartup: [],
  });

  constructor(
    protected planesInversionService: PlanesInversionService,
    protected startupsService: StartupsService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ planesInversion }) => {
      this.updateForm(planesInversion);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const planesInversion = this.createFromForm();
    if (planesInversion.id !== undefined) {
      this.subscribeToSaveResponse(this.planesInversionService.update(planesInversion));
    } else {
      this.subscribeToSaveResponse(this.planesInversionService.create(planesInversion));
    }
  }

  trackStartupsById(_index: number, item: IStartups): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPlanesInversion>>): void {
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

  protected updateForm(planesInversion: IPlanesInversion): void {
    this.editForm.patchValue({
      id: planesInversion.id,
      nombre: planesInversion.nombre,
      monto: planesInversion.monto,
      descripcion: planesInversion.descripcion,
      beneficios: planesInversion.beneficios,
      porcentajeEmpresarial: planesInversion.porcentajeEmpresarial,
      estado: planesInversion.estado,
      idStartup: planesInversion.idStartup,
    });

    this.startupsSharedCollection = this.startupsService.addStartupsToCollectionIfMissing(
      this.startupsSharedCollection,
      planesInversion.idStartup
    );
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

  protected createFromForm(): IPlanesInversion {
    return {
      ...new PlanesInversion(),
      id: this.editForm.get(['id'])!.value,
      nombre: this.editForm.get(['nombre'])!.value,
      monto: this.editForm.get(['monto'])!.value,
      descripcion: this.editForm.get(['descripcion'])!.value,
      beneficios: this.editForm.get(['beneficios'])!.value,
      porcentajeEmpresarial: this.editForm.get(['porcentajeEmpresarial'])!.value,
      estado: this.editForm.get(['estado'])!.value,
      idStartup: this.editForm.get(['idStartup'])!.value,
    };
  }
}
