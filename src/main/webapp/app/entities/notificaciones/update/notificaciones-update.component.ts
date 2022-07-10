import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';

import { INotificaciones, Notificaciones } from '../notificaciones.model';
import { NotificacionesService } from '../service/notificaciones.service';
import { IStartups } from 'app/entities/startups/startups.model';
import { StartupsService } from 'app/entities/startups/service/startups.service';
import { IUsuarios } from 'app/entities/usuarios/usuarios.model';
import { UsuariosService } from 'app/entities/usuarios/service/usuarios.service';

@Component({
  selector: 'jhi-notificaciones-update',
  templateUrl: './notificaciones-update.component.html',
})
export class NotificacionesUpdateComponent implements OnInit {
  isSaving = false;

  startupsSharedCollection: IStartups[] = [];
  usuariosSharedCollection: IUsuarios[] = [];

  editForm = this.fb.group({
    id: [],
    tipo: [null, [Validators.minLength(1), Validators.maxLength(50)]],
    descripcion: [null, [Validators.minLength(1), Validators.maxLength(300)]],
    fecha: [],
    tipoRemitente: [null, [Validators.minLength(1), Validators.maxLength(50)]],
    tipoReceptor: [null, [Validators.minLength(1), Validators.maxLength(50)]],
    estado: [null, [Validators.minLength(1), Validators.maxLength(50)]],
    idStartup: [],
    idUsuario: [],
  });

  constructor(
    protected notificacionesService: NotificacionesService,
    protected startupsService: StartupsService,
    protected usuariosService: UsuariosService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ notificaciones }) => {
      if (notificaciones.id === undefined) {
        const today = dayjs().startOf('day');
        notificaciones.fecha = today;
      }

      this.updateForm(notificaciones);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const notificaciones = this.createFromForm();
    if (notificaciones.id !== undefined) {
      this.subscribeToSaveResponse(this.notificacionesService.update(notificaciones));
    } else {
      this.subscribeToSaveResponse(this.notificacionesService.create(notificaciones));
    }
  }

  trackStartupsById(_index: number, item: IStartups): number {
    return item.id!;
  }

  trackUsuariosById(_index: number, item: IUsuarios): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<INotificaciones>>): void {
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

  protected updateForm(notificaciones: INotificaciones): void {
    this.editForm.patchValue({
      id: notificaciones.id,
      tipo: notificaciones.tipo,
      descripcion: notificaciones.descripcion,
      fecha: notificaciones.fecha ? notificaciones.fecha.format(DATE_TIME_FORMAT) : null,
      tipoRemitente: notificaciones.tipoRemitente,
      tipoReceptor: notificaciones.tipoReceptor,
      estado: notificaciones.estado,
      idStartup: notificaciones.idStartup,
      idUsuario: notificaciones.idUsuario,
    });

    this.startupsSharedCollection = this.startupsService.addStartupsToCollectionIfMissing(
      this.startupsSharedCollection,
      notificaciones.idStartup
    );
    this.usuariosSharedCollection = this.usuariosService.addUsuariosToCollectionIfMissing(
      this.usuariosSharedCollection,
      notificaciones.idUsuario
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

    this.usuariosService
      .query()
      .pipe(map((res: HttpResponse<IUsuarios[]>) => res.body ?? []))
      .pipe(
        map((usuarios: IUsuarios[]) =>
          this.usuariosService.addUsuariosToCollectionIfMissing(usuarios, this.editForm.get('idUsuario')!.value)
        )
      )
      .subscribe((usuarios: IUsuarios[]) => (this.usuariosSharedCollection = usuarios));
  }

  protected createFromForm(): INotificaciones {
    return {
      ...new Notificaciones(),
      id: this.editForm.get(['id'])!.value,
      tipo: this.editForm.get(['tipo'])!.value,
      descripcion: this.editForm.get(['descripcion'])!.value,
      fecha: this.editForm.get(['fecha'])!.value ? dayjs(this.editForm.get(['fecha'])!.value, DATE_TIME_FORMAT) : undefined,
      tipoRemitente: this.editForm.get(['tipoRemitente'])!.value,
      tipoReceptor: this.editForm.get(['tipoReceptor'])!.value,
      estado: this.editForm.get(['estado'])!.value,
      idStartup: this.editForm.get(['idStartup'])!.value,
      idUsuario: this.editForm.get(['idUsuario'])!.value,
    };
  }
}
