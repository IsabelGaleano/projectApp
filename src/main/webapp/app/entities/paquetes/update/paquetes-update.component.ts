import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IPaquetes, Paquetes } from '../paquetes.model';
import { PaquetesService } from '../service/paquetes.service';
import { IStartups } from 'app/entities/startups/startups.model';
import { StartupsService } from 'app/entities/startups/service/startups.service';

@Component({
  selector: 'jhi-paquetes-update',
  templateUrl: './paquetes-update.component.html',
})
export class PaquetesUpdateComponent implements OnInit {
  isSaving = false;

  startupsSharedCollection: IStartups[] = [];

  editForm = this.fb.group({
    id: [],
    nombre: [null, [Validators.minLength(1), Validators.maxLength(200)]],
    monto: [],
    descripcion: [null, [Validators.minLength(1), Validators.maxLength(300)]],
    dimensiones: [null, [Validators.minLength(1), Validators.maxLength(50)]],
    estado: [null, [Validators.minLength(1), Validators.maxLength(50)]],
    idStartup: [],
  });

  constructor(
    protected paquetesService: PaquetesService,
    protected startupsService: StartupsService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ paquetes }) => {
      this.updateForm(paquetes);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const paquetes = this.createFromForm();
    if (paquetes.id !== undefined) {
      this.subscribeToSaveResponse(this.paquetesService.update(paquetes));
    } else {
      this.subscribeToSaveResponse(this.paquetesService.create(paquetes));
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

  protected updateForm(paquetes: IPaquetes): void {
    this.editForm.patchValue({
      id: paquetes.id,
      nombre: paquetes.nombre,
      monto: paquetes.monto,
      descripcion: paquetes.descripcion,
      dimensiones: paquetes.dimensiones,
      estado: paquetes.estado,
      idStartup: paquetes.idStartup,
    });

    this.startupsSharedCollection = this.startupsService.addStartupsToCollectionIfMissing(
      this.startupsSharedCollection,
      paquetes.idStartup
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

  protected createFromForm(): IPaquetes {
    return {
      ...new Paquetes(),
      id: this.editForm.get(['id'])!.value,
      nombre: this.editForm.get(['nombre'])!.value,
      monto: this.editForm.get(['monto'])!.value,
      descripcion: this.editForm.get(['descripcion'])!.value,
      dimensiones: this.editForm.get(['dimensiones'])!.value,
      estado: this.editForm.get(['estado'])!.value,
      idStartup: this.editForm.get(['idStartup'])!.value,
    };
  }
}
