import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';

import { IRastreador, Rastreador } from '../rastreador.model';
import { RastreadorService } from '../service/rastreador.service';
import { IDonacionesPaquetes } from 'app/entities/donaciones-paquetes/donaciones-paquetes.model';
import { DonacionesPaquetesService } from 'app/entities/donaciones-paquetes/service/donaciones-paquetes.service';

@Component({
  selector: 'jhi-rastreador-update',
  templateUrl: './rastreador-update.component.html',
})
export class RastreadorUpdateComponent implements OnInit {
  isSaving = false;

  donacionesPaquetesSharedCollection: IDonacionesPaquetes[] = [];

  editForm = this.fb.group({
    id: [],
    descripcion: [null, [Validators.minLength(1), Validators.maxLength(300)]],
    latitud: [null, [Validators.minLength(1), Validators.maxLength(50)]],
    longitud: [null, [Validators.minLength(1), Validators.maxLength(50)]],
    fecha: [],
    estado: [null, [Validators.minLength(1), Validators.maxLength(50)]],
    idDonacionPaquete: [],
  });

  constructor(
    protected rastreadorService: RastreadorService,
    protected donacionesPaquetesService: DonacionesPaquetesService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ rastreador }) => {
      if (rastreador.id === undefined) {
        const today = dayjs().startOf('day');
        rastreador.fecha = today;
      }

      this.updateForm(rastreador);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const rastreador = this.createFromForm();
    if (rastreador.id !== undefined) {
      this.subscribeToSaveResponse(this.rastreadorService.update(rastreador));
    } else {
      this.subscribeToSaveResponse(this.rastreadorService.create(rastreador));
    }
  }

  trackDonacionesPaquetesById(_index: number, item: IDonacionesPaquetes): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRastreador>>): void {
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

  protected updateForm(rastreador: IRastreador): void {
    this.editForm.patchValue({
      id: rastreador.id,
      descripcion: rastreador.descripcion,
      latitud: rastreador.latitud,
      longitud: rastreador.longitud,
      fecha: rastreador.fecha ? rastreador.fecha.format(DATE_TIME_FORMAT) : null,
      estado: rastreador.estado,
      idDonacionPaquete: rastreador.idDonacionPaquete,
    });

    this.donacionesPaquetesSharedCollection = this.donacionesPaquetesService.addDonacionesPaquetesToCollectionIfMissing(
      this.donacionesPaquetesSharedCollection,
      rastreador.idDonacionPaquete
    );
  }

  protected loadRelationshipsOptions(): void {
    this.donacionesPaquetesService
      .query()
      .pipe(map((res: HttpResponse<IDonacionesPaquetes[]>) => res.body ?? []))
      .pipe(
        map((donacionesPaquetes: IDonacionesPaquetes[]) =>
          this.donacionesPaquetesService.addDonacionesPaquetesToCollectionIfMissing(
            donacionesPaquetes,
            this.editForm.get('idDonacionPaquete')!.value
          )
        )
      )
      .subscribe((donacionesPaquetes: IDonacionesPaquetes[]) => (this.donacionesPaquetesSharedCollection = donacionesPaquetes));
  }

  protected createFromForm(): IRastreador {
    return {
      ...new Rastreador(),
      id: this.editForm.get(['id'])!.value,
      descripcion: this.editForm.get(['descripcion'])!.value,
      latitud: this.editForm.get(['latitud'])!.value,
      longitud: this.editForm.get(['longitud'])!.value,
      fecha: this.editForm.get(['fecha'])!.value ? dayjs(this.editForm.get(['fecha'])!.value, DATE_TIME_FORMAT) : undefined,
      estado: this.editForm.get(['estado'])!.value,
      idDonacionPaquete: this.editForm.get(['idDonacionPaquete'])!.value,
    };
  }
}
