import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';

import { IInscripciones, Inscripciones } from '../inscripciones.model';
import { InscripcionesService } from '../service/inscripciones.service';
import { IStartups } from 'app/entities/startups/startups.model';
import { StartupsService } from 'app/entities/startups/service/startups.service';

@Component({
  selector: 'jhi-inscripciones-update',
  templateUrl: './inscripciones-update.component.html',
})
export class InscripcionesUpdateComponent implements OnInit {
  isSaving = false;

  idStartupsCollection: IStartups[] = [];

  editForm = this.fb.group({
    id: [],
    nombre: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
    descripcion: [null, [Validators.minLength(1), Validators.maxLength(200)]],
    monto: [],
    tipo: [null, [Validators.minLength(1), Validators.maxLength(50)]],
    fechaInicial: [],
    fechaFinal: [],
    beneficios: [null, [Validators.minLength(1), Validators.maxLength(4000)]],
    estado: [null, [Validators.minLength(1), Validators.maxLength(50)]],
    numInscripcion: [],
    idStartup: [],
  });

  constructor(
    protected inscripcionesService: InscripcionesService,
    protected startupsService: StartupsService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ inscripciones }) => {
      if (inscripciones.id === undefined) {
        const today = dayjs().startOf('day');
        inscripciones.fechaInicial = today;
        inscripciones.fechaFinal = today;
      }

      this.updateForm(inscripciones);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const inscripciones = this.createFromForm();
    if (inscripciones.id !== undefined) {
      this.subscribeToSaveResponse(this.inscripcionesService.update(inscripciones));
    } else {
      this.subscribeToSaveResponse(this.inscripcionesService.create(inscripciones));
    }
  }

  trackStartupsById(_index: number, item: IStartups): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IInscripciones>>): void {
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

  protected updateForm(inscripciones: IInscripciones): void {
    this.editForm.patchValue({
      id: inscripciones.id,
      nombre: inscripciones.nombre,
      descripcion: inscripciones.descripcion,
      monto: inscripciones.monto,
      tipo: inscripciones.tipo,
      fechaInicial: inscripciones.fechaInicial ? inscripciones.fechaInicial.format(DATE_TIME_FORMAT) : null,
      fechaFinal: inscripciones.fechaFinal ? inscripciones.fechaFinal.format(DATE_TIME_FORMAT) : null,
      beneficios: inscripciones.beneficios,
      estado: inscripciones.estado,
      numInscripcion: inscripciones.numInscripcion,
      idStartup: inscripciones.idStartup,
    });

    this.idStartupsCollection = this.startupsService.addStartupsToCollectionIfMissing(this.idStartupsCollection, inscripciones.idStartup);
  }

  protected loadRelationshipsOptions(): void {
    this.startupsService
      .query({ filter: 'inscripciones-is-null' })
      .pipe(map((res: HttpResponse<IStartups[]>) => res.body ?? []))
      .pipe(
        map((startups: IStartups[]) =>
          this.startupsService.addStartupsToCollectionIfMissing(startups, this.editForm.get('idStartup')!.value)
        )
      )
      .subscribe((startups: IStartups[]) => (this.idStartupsCollection = startups));
  }

  protected createFromForm(): IInscripciones {
    return {
      ...new Inscripciones(),
      id: this.editForm.get(['id'])!.value,
      nombre: this.editForm.get(['nombre'])!.value,
      descripcion: this.editForm.get(['descripcion'])!.value,
      monto: this.editForm.get(['monto'])!.value,
      tipo: this.editForm.get(['tipo'])!.value,
      fechaInicial: this.editForm.get(['fechaInicial'])!.value
        ? dayjs(this.editForm.get(['fechaInicial'])!.value, DATE_TIME_FORMAT)
        : undefined,
      fechaFinal: this.editForm.get(['fechaFinal'])!.value ? dayjs(this.editForm.get(['fechaFinal'])!.value, DATE_TIME_FORMAT) : undefined,
      beneficios: this.editForm.get(['beneficios'])!.value,
      estado: this.editForm.get(['estado'])!.value,
      numInscripcion: this.editForm.get(['numInscripcion'])!.value,
      idStartup: this.editForm.get(['idStartup'])!.value,
    };
  }
}
