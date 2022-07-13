import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IRolesUsuarios, RolesUsuarios } from '../roles-usuarios.model';
import { RolesUsuariosService } from '../service/roles-usuarios.service';

@Component({
  selector: 'jhi-roles-usuarios-update',
  templateUrl: './roles-usuarios-update.component.html',
})
export class RolesUsuariosUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    rol: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
  });

  constructor(protected rolesUsuariosService: RolesUsuariosService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ rolesUsuarios }) => {
      this.updateForm(rolesUsuarios);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const rolesUsuarios = this.createFromForm();
    if (rolesUsuarios.id !== undefined) {
      this.subscribeToSaveResponse(this.rolesUsuariosService.update(rolesUsuarios));
    } else {
      this.subscribeToSaveResponse(this.rolesUsuariosService.create(rolesUsuarios));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRolesUsuarios>>): void {
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

  protected updateForm(rolesUsuarios: IRolesUsuarios): void {
    this.editForm.patchValue({
      id: rolesUsuarios.id,
      rol: rolesUsuarios.rol,
    });
  }

  protected createFromForm(): IRolesUsuarios {
    return {
      ...new RolesUsuarios(),
      id: this.editForm.get(['id'])!.value,
      rol: this.editForm.get(['rol'])!.value,
    };
  }
}
