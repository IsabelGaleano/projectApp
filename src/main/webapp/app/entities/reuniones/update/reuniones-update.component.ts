import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';

import { IReuniones, Reuniones } from '../reuniones.model';
import { ReunionesService } from '../service/reuniones.service';
import { IStartups } from 'app/entities/startups/startups.model';
import { StartupsService } from 'app/entities/startups/service/startups.service';
import { IUsuarios } from 'app/entities/usuarios/usuarios.model';
import { UsuariosService } from 'app/entities/usuarios/service/usuarios.service';

@Component({
  selector: 'jhi-reuniones-update',
  templateUrl: './reuniones-update.component.html',
})
export class ReunionesUpdateComponent implements OnInit {
  isSaving = false;

  startupsSharedCollection: IStartups[] = [];
  usuariosSharedCollection: IUsuarios[] = [];

  editForm = this.fb.group({
    id: [],
    url: [null, [Validators.minLength(1), Validators.maxLength(500)]],
    descripcion: [null, [Validators.minLength(1), Validators.maxLength(300)]],
    fechaSolicitada: [],
    fechaReunion: [],
    horaReunion: [],
    estado: [null, [Validators.minLength(1), Validators.maxLength(50)]],
    idStartup: [],
    idUsuario: [],
  });

  constructor(
    protected reunionesService: ReunionesService,
    protected startupsService: StartupsService,
    protected usuariosService: UsuariosService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ reuniones }) => {
      if (reuniones.id === undefined) {
        const today = dayjs().startOf('day');
        reuniones.fechaSolicitada = today;
        reuniones.fechaReunion = today;
        reuniones.horaReunion = today;
      }

      this.updateForm(reuniones);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const reuniones = this.createFromForm();
    if (reuniones.id !== undefined) {
      this.subscribeToSaveResponse(this.reunionesService.update(reuniones));
    } else {
      this.subscribeToSaveResponse(this.reunionesService.create(reuniones));
    }
  }

  trackStartupsById(_index: number, item: IStartups): number {
    return item.id!;
  }

  trackUsuariosById(_index: number, item: IUsuarios): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IReuniones>>): void {
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

  protected updateForm(reuniones: IReuniones): void {
    this.editForm.patchValue({
      id: reuniones.id,
      url: reuniones.url,
      descripcion: reuniones.descripcion,
      fechaSolicitada: reuniones.fechaSolicitada ? reuniones.fechaSolicitada.format(DATE_TIME_FORMAT) : null,
      fechaReunion: reuniones.fechaReunion ? reuniones.fechaReunion.format(DATE_TIME_FORMAT) : null,
      horaReunion: reuniones.horaReunion ? reuniones.horaReunion.format(DATE_TIME_FORMAT) : null,
      estado: reuniones.estado,
      idStartup: reuniones.idStartup,
      idUsuario: reuniones.idUsuario,
    });

    this.startupsSharedCollection = this.startupsService.addStartupsToCollectionIfMissing(
      this.startupsSharedCollection,
      reuniones.idStartup
    );
    this.usuariosSharedCollection = this.usuariosService.addUsuariosToCollectionIfMissing(
      this.usuariosSharedCollection,
      reuniones.idUsuario
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

  protected createFromForm(): IReuniones {
    return {
      ...new Reuniones(),
      id: this.editForm.get(['id'])!.value,
      url: this.editForm.get(['url'])!.value,
      descripcion: this.editForm.get(['descripcion'])!.value,
      fechaSolicitada: this.editForm.get(['fechaSolicitada'])!.value
        ? dayjs(this.editForm.get(['fechaSolicitada'])!.value, DATE_TIME_FORMAT)
        : undefined,
      fechaReunion: this.editForm.get(['fechaReunion'])!.value
        ? dayjs(this.editForm.get(['fechaReunion'])!.value, DATE_TIME_FORMAT)
        : undefined,
      horaReunion: this.editForm.get(['horaReunion'])!.value
        ? dayjs(this.editForm.get(['horaReunion'])!.value, DATE_TIME_FORMAT)
        : undefined,
      estado: this.editForm.get(['estado'])!.value,
      idStartup: this.editForm.get(['idStartup'])!.value,
      idUsuario: this.editForm.get(['idUsuario'])!.value,
    };
  }
}
