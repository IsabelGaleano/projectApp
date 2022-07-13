import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { ICategorias, Categorias } from '../categorias.model';
import { CategoriasService } from '../service/categorias.service';

@Component({
  selector: 'jhi-categorias-update',
  templateUrl: './categorias-update.component.html',
})
export class CategoriasUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    categoria: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
    estado: [null, [Validators.minLength(1), Validators.maxLength(50)]],
  });

  constructor(protected categoriasService: CategoriasService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ categorias }) => {
      this.updateForm(categorias);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const categorias = this.createFromForm();
    if (categorias.id !== undefined) {
      this.subscribeToSaveResponse(this.categoriasService.update(categorias));
    } else {
      this.subscribeToSaveResponse(this.categoriasService.create(categorias));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICategorias>>): void {
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

  protected updateForm(categorias: ICategorias): void {
    this.editForm.patchValue({
      id: categorias.id,
      categoria: categorias.categoria,
      estado: categorias.estado,
    });
  }

  protected createFromForm(): ICategorias {
    return {
      ...new Categorias(),
      id: this.editForm.get(['id'])!.value,
      categoria: this.editForm.get(['categoria'])!.value,
      estado: this.editForm.get(['estado'])!.value,
    };
  }
}
