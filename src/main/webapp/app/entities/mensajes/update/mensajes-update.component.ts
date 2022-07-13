import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';

import { IMensajes, Mensajes } from '../mensajes.model';
import { MensajesService } from '../service/mensajes.service';
import { IStartups } from 'app/entities/startups/startups.model';
import { StartupsService } from 'app/entities/startups/service/startups.service';
import { IUsuarios } from 'app/entities/usuarios/usuarios.model';
import { UsuariosService } from 'app/entities/usuarios/service/usuarios.service';

@Component({
  selector: 'jhi-mensajes-update',
  templateUrl: './mensajes-update.component.html',
})
export class MensajesUpdateComponent implements OnInit {
  isSaving = false;

  startupsSharedCollection: IStartups[] = [];
  usuariosSharedCollection: IUsuarios[] = [];

  editForm = this.fb.group({
    id: [],
    mensaje: [null, [Validators.minLength(1), Validators.maxLength(2000)]],
    fecha: [],
    tipoRemitente: [null, [Validators.minLength(1), Validators.maxLength(50)]],
    tipoReceptor: [null, [Validators.minLength(1), Validators.maxLength(50)]],
    estado: [null, [Validators.minLength(1), Validators.maxLength(50)]],
    idStartup: [],
    idUsuario: [],
  });

  constructor(
    protected mensajesService: MensajesService,
    protected startupsService: StartupsService,
    protected usuariosService: UsuariosService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ mensajes }) => {
      if (mensajes.id === undefined) {
        const today = dayjs().startOf('day');
        mensajes.fecha = today;
      }

      this.updateForm(mensajes);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const mensajes = this.createFromForm();
    if (mensajes.id !== undefined) {
      this.subscribeToSaveResponse(this.mensajesService.update(mensajes));
    } else {
      this.subscribeToSaveResponse(this.mensajesService.create(mensajes));
    }
  }

  trackStartupsById(_index: number, item: IStartups): number {
    return item.id!;
  }

  trackUsuariosById(_index: number, item: IUsuarios): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMensajes>>): void {
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

  protected updateForm(mensajes: IMensajes): void {
    this.editForm.patchValue({
      id: mensajes.id,
      mensaje: mensajes.mensaje,
      fecha: mensajes.fecha ? mensajes.fecha.format(DATE_TIME_FORMAT) : null,
      tipoRemitente: mensajes.tipoRemitente,
      tipoReceptor: mensajes.tipoReceptor,
      estado: mensajes.estado,
      idStartup: mensajes.idStartup,
      idUsuario: mensajes.idUsuario,
    });

    this.startupsSharedCollection = this.startupsService.addStartupsToCollectionIfMissing(
      this.startupsSharedCollection,
      mensajes.idStartup
    );
    this.usuariosSharedCollection = this.usuariosService.addUsuariosToCollectionIfMissing(
      this.usuariosSharedCollection,
      mensajes.idUsuario
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

  protected createFromForm(): IMensajes {
    return {
      ...new Mensajes(),
      id: this.editForm.get(['id'])!.value,
      mensaje: this.editForm.get(['mensaje'])!.value,
      fecha: this.editForm.get(['fecha'])!.value ? dayjs(this.editForm.get(['fecha'])!.value, DATE_TIME_FORMAT) : undefined,
      tipoRemitente: this.editForm.get(['tipoRemitente'])!.value,
      tipoReceptor: this.editForm.get(['tipoReceptor'])!.value,
      estado: this.editForm.get(['estado'])!.value,
      idStartup: this.editForm.get(['idStartup'])!.value,
      idUsuario: this.editForm.get(['idUsuario'])!.value,
    };
  }
}
