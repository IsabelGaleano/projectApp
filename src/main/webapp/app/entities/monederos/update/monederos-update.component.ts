import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IMonederos, Monederos } from '../monederos.model';
import { MonederosService } from '../service/monederos.service';

@Component({
  selector: 'jhi-monederos-update',
  templateUrl: './monederos-update.component.html',
})
export class MonederosUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    tipo: [null, [Validators.minLength(1), Validators.maxLength(50)]],
    saldo: [],
    estado: [null, [Validators.minLength(1), Validators.maxLength(50)]],
  });

  constructor(protected monederosService: MonederosService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ monederos }) => {
      this.updateForm(monederos);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const monederos = this.createFromForm();
    if (monederos.id !== undefined) {
      this.subscribeToSaveResponse(this.monederosService.update(monederos));
    } else {
      this.subscribeToSaveResponse(this.monederosService.create(monederos));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMonederos>>): void {
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

  protected updateForm(monederos: IMonederos): void {
    this.editForm.patchValue({
      id: monederos.id,
      tipo: monederos.tipo,
      saldo: monederos.saldo,
      estado: monederos.estado,
    });
  }

  protected createFromForm(): IMonederos {
    return {
      ...new Monederos(),
      id: this.editForm.get(['id'])!.value,
      tipo: this.editForm.get(['tipo'])!.value,
      saldo: this.editForm.get(['saldo'])!.value,
      estado: this.editForm.get(['estado'])!.value,
    };
  }
}
