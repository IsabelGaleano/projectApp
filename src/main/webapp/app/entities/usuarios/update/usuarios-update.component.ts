import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';

import { IUsuarios, Usuarios } from '../usuarios.model';
import { UsuariosService } from '../service/usuarios.service';
import { IMonederos } from 'app/entities/monederos/monederos.model';
import { MonederosService } from 'app/entities/monederos/service/monederos.service';
import { IRolesUsuarios } from 'app/entities/roles-usuarios/roles-usuarios.model';
import { RolesUsuariosService } from 'app/entities/roles-usuarios/service/roles-usuarios.service';

@Component({
  selector: 'jhi-usuarios-update',
  templateUrl: './usuarios-update.component.html',
})
export class UsuariosUpdateComponent implements OnInit {
  isSaving = false;

  idMonederosCollection: IMonederos[] = [];
  rolesUsuariosSharedCollection: IRolesUsuarios[] = [];

  editForm = this.fb.group({
    id: [],
    nombre: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(100)]],
    cedula: [null, [Validators.minLength(1), Validators.maxLength(50)]],
    primerApellido: [null, [Validators.minLength(1), Validators.maxLength(100)]],
    segundoApellido: [null, [Validators.minLength(1), Validators.maxLength(100)]],
    correoElectronico: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(300)]],
    genero: [],
    telefono: [null, [Validators.minLength(1), Validators.maxLength(50)]],
    fechaNacimiento: [],
    latitudDireccion: [null, [Validators.minLength(1), Validators.maxLength(50)]],
    longitudDireccion: [null, [Validators.minLength(1), Validators.maxLength(50)]],
    imagenURL: [null, [Validators.minLength(1), Validators.maxLength(300)]],
    tipoUsuarioFinal: [null, [Validators.minLength(1), Validators.maxLength(50)]],
    contrasennia: [null, [Validators.minLength(1), Validators.maxLength(50)]],
    estado: [null, [Validators.minLength(1), Validators.maxLength(50)]],
    idMonedero: [],
    idRol: [],
  });

  constructor(
    protected usuariosService: UsuariosService,
    protected monederosService: MonederosService,
    protected rolesUsuariosService: RolesUsuariosService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ usuarios }) => {
      if (usuarios.id === undefined) {
        const today = dayjs().startOf('day');
        usuarios.fechaNacimiento = today;
      }

      this.updateForm(usuarios);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const usuarios = this.createFromForm();
    if (usuarios.id !== undefined) {
      this.subscribeToSaveResponse(this.usuariosService.update(usuarios));
    } else {
      this.subscribeToSaveResponse(this.usuariosService.create(usuarios));
    }
  }

  trackMonederosById(_index: number, item: IMonederos): number {
    return item.id!;
  }

  trackRolesUsuariosById(_index: number, item: IRolesUsuarios): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IUsuarios>>): void {
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

  protected updateForm(usuarios: IUsuarios): void {
    this.editForm.patchValue({
      id: usuarios.id,
      nombre: usuarios.nombre,
      cedula: usuarios.cedula,
      primerApellido: usuarios.primerApellido,
      segundoApellido: usuarios.segundoApellido,
      correoElectronico: usuarios.correoElectronico,
      genero: usuarios.genero,
      telefono: usuarios.telefono,
      fechaNacimiento: usuarios.fechaNacimiento ? usuarios.fechaNacimiento.format(DATE_TIME_FORMAT) : null,
      latitudDireccion: usuarios.latitudDireccion,
      longitudDireccion: usuarios.longitudDireccion,
      imagenURL: usuarios.imagenURL,
      tipoUsuarioFinal: usuarios.tipoUsuarioFinal,
      contrasennia: usuarios.contrasennia,
      estado: usuarios.estado,
      idMonedero: usuarios.idMonedero,
      idRol: usuarios.idRol,
    });

    this.idMonederosCollection = this.monederosService.addMonederosToCollectionIfMissing(this.idMonederosCollection, usuarios.idMonedero);
    this.rolesUsuariosSharedCollection = this.rolesUsuariosService.addRolesUsuariosToCollectionIfMissing(
      this.rolesUsuariosSharedCollection,
      usuarios.idRol
    );
  }

  protected loadRelationshipsOptions(): void {
    this.monederosService
      .query({ filter: 'usuarios-is-null' })
      .pipe(map((res: HttpResponse<IMonederos[]>) => res.body ?? []))
      .pipe(
        map((monederos: IMonederos[]) =>
          this.monederosService.addMonederosToCollectionIfMissing(monederos, this.editForm.get('idMonedero')!.value)
        )
      )
      .subscribe((monederos: IMonederos[]) => (this.idMonederosCollection = monederos));

    this.rolesUsuariosService
      .query()
      .pipe(map((res: HttpResponse<IRolesUsuarios[]>) => res.body ?? []))
      .pipe(
        map((rolesUsuarios: IRolesUsuarios[]) =>
          this.rolesUsuariosService.addRolesUsuariosToCollectionIfMissing(rolesUsuarios, this.editForm.get('idRol')!.value)
        )
      )
      .subscribe((rolesUsuarios: IRolesUsuarios[]) => (this.rolesUsuariosSharedCollection = rolesUsuarios));
  }

  protected createFromForm(): IUsuarios {
    return {
      ...new Usuarios(),
      id: this.editForm.get(['id'])!.value,
      nombre: this.editForm.get(['nombre'])!.value,
      cedula: this.editForm.get(['cedula'])!.value,
      primerApellido: this.editForm.get(['primerApellido'])!.value,
      segundoApellido: this.editForm.get(['segundoApellido'])!.value,
      correoElectronico: this.editForm.get(['correoElectronico'])!.value,
      genero: this.editForm.get(['genero'])!.value,
      telefono: this.editForm.get(['telefono'])!.value,
      fechaNacimiento: this.editForm.get(['fechaNacimiento'])!.value
        ? dayjs(this.editForm.get(['fechaNacimiento'])!.value, DATE_TIME_FORMAT)
        : undefined,
      latitudDireccion: this.editForm.get(['latitudDireccion'])!.value,
      longitudDireccion: this.editForm.get(['longitudDireccion'])!.value,
      imagenURL: this.editForm.get(['imagenURL'])!.value,
      tipoUsuarioFinal: this.editForm.get(['tipoUsuarioFinal'])!.value,
      contrasennia: this.editForm.get(['contrasennia'])!.value,
      estado: this.editForm.get(['estado'])!.value,
      idMonedero: this.editForm.get(['idMonedero'])!.value,
      idRol: this.editForm.get(['idRol'])!.value,
    };
  }
}
