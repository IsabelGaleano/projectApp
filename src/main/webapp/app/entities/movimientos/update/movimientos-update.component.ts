import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';

import { IMovimientos, Movimientos } from '../movimientos.model';
import { MovimientosService } from '../service/movimientos.service';
import { IMonederos } from 'app/entities/monederos/monederos.model';
import { MonederosService } from 'app/entities/monederos/service/monederos.service';

@Component({
  selector: 'jhi-movimientos-update',
  templateUrl: './movimientos-update.component.html',
})
export class MovimientosUpdateComponent implements OnInit {
  isSaving = false;

  monederosSharedCollection: IMonederos[] = [];

  editForm = this.fb.group({
    id: [],
    fecha: [],
    monto: [],
    tipo: [null, [Validators.minLength(1), Validators.maxLength(50)]],
    descripcion: [null, [Validators.minLength(1), Validators.maxLength(300)]],
    estado: [null, [Validators.minLength(1), Validators.maxLength(50)]],
    idMonedero: [],
  });

  constructor(
    protected movimientosService: MovimientosService,
    protected monederosService: MonederosService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ movimientos }) => {
      if (movimientos.id === undefined) {
        const today = dayjs().startOf('day');
        movimientos.fecha = today;
      }

      this.updateForm(movimientos);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const movimientos = this.createFromForm();
    if (movimientos.id !== undefined) {
      this.subscribeToSaveResponse(this.movimientosService.update(movimientos));
    } else {
      this.subscribeToSaveResponse(this.movimientosService.create(movimientos));
    }
  }

  trackMonederosById(_index: number, item: IMonederos): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMovimientos>>): void {
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

  protected updateForm(movimientos: IMovimientos): void {
    this.editForm.patchValue({
      id: movimientos.id,
      fecha: movimientos.fecha ? movimientos.fecha.format(DATE_TIME_FORMAT) : null,
      monto: movimientos.monto,
      tipo: movimientos.tipo,
      descripcion: movimientos.descripcion,
      estado: movimientos.estado,
      idMonedero: movimientos.idMonedero,
    });

    this.monederosSharedCollection = this.monederosService.addMonederosToCollectionIfMissing(
      this.monederosSharedCollection,
      movimientos.idMonedero
    );
  }

  protected loadRelationshipsOptions(): void {
    this.monederosService
      .query()
      .pipe(map((res: HttpResponse<IMonederos[]>) => res.body ?? []))
      .pipe(
        map((monederos: IMonederos[]) =>
          this.monederosService.addMonederosToCollectionIfMissing(monederos, this.editForm.get('idMonedero')!.value)
        )
      )
      .subscribe((monederos: IMonederos[]) => (this.monederosSharedCollection = monederos));
  }

  protected createFromForm(): IMovimientos {
    return {
      ...new Movimientos(),
      id: this.editForm.get(['id'])!.value,
      fecha: this.editForm.get(['fecha'])!.value ? dayjs(this.editForm.get(['fecha'])!.value, DATE_TIME_FORMAT) : undefined,
      monto: this.editForm.get(['monto'])!.value,
      tipo: this.editForm.get(['tipo'])!.value,
      descripcion: this.editForm.get(['descripcion'])!.value,
      estado: this.editForm.get(['estado'])!.value,
      idMonedero: this.editForm.get(['idMonedero'])!.value,
    };
  }
}
