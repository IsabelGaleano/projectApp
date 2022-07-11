import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';

import { IComentarios, Comentarios } from '../comentarios.model';
import { ComentariosService } from '../service/comentarios.service';
import { IStartups } from 'app/entities/startups/startups.model';
import { StartupsService } from 'app/entities/startups/service/startups.service';
import { IUsuarios } from 'app/entities/usuarios/usuarios.model';
import { UsuariosService } from 'app/entities/usuarios/service/usuarios.service';

@Component({
  selector: 'jhi-comentarios-update',
  templateUrl: './comentarios-update.component.html',
})
export class ComentariosUpdateComponent implements OnInit {
  isSaving = false;

  startupsSharedCollection: IStartups[] = [];
  usuariosSharedCollection: IUsuarios[] = [];

  editForm = this.fb.group({
    id: [],
    comentario: [null, [Validators.minLength(1), Validators.maxLength(1000)]],
    estado: [null, [Validators.minLength(1), Validators.maxLength(50)]],
    fecha: [],
    idStartup: [],
    idUsuario: [],
  });

  constructor(
    protected comentariosService: ComentariosService,
    protected startupsService: StartupsService,
    protected usuariosService: UsuariosService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ comentarios }) => {
      if (comentarios.id === undefined) {
        const today = dayjs().startOf('day');
        comentarios.fecha = today;
      }

      this.updateForm(comentarios);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const comentarios = this.createFromForm();
    if (comentarios.id !== undefined) {
      this.subscribeToSaveResponse(this.comentariosService.update(comentarios));
    } else {
      this.subscribeToSaveResponse(this.comentariosService.create(comentarios));
    }
  }

  trackStartupsById(_index: number, item: IStartups): number {
    return item.id!;
  }

  trackUsuariosById(_index: number, item: IUsuarios): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IComentarios>>): void {
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

  protected updateForm(comentarios: IComentarios): void {
    this.editForm.patchValue({
      id: comentarios.id,
      comentario: comentarios.comentario,
      estado: comentarios.estado,
      fecha: comentarios.fecha ? comentarios.fecha.format(DATE_TIME_FORMAT) : null,
      idStartup: comentarios.idStartup,
      idUsuario: comentarios.idUsuario,
    });

    this.startupsSharedCollection = this.startupsService.addStartupsToCollectionIfMissing(
      this.startupsSharedCollection,
      comentarios.idStartup
    );
    this.usuariosSharedCollection = this.usuariosService.addUsuariosToCollectionIfMissing(
      this.usuariosSharedCollection,
      comentarios.idUsuario
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

  protected createFromForm(): IComentarios {
    return {
      ...new Comentarios(),
      id: this.editForm.get(['id'])!.value,
      comentario: this.editForm.get(['comentario'])!.value,
      estado: this.editForm.get(['estado'])!.value,
      fecha: this.editForm.get(['fecha'])!.value ? dayjs(this.editForm.get(['fecha'])!.value, DATE_TIME_FORMAT) : undefined,
      idStartup: this.editForm.get(['idStartup'])!.value,
      idUsuario: this.editForm.get(['idUsuario'])!.value,
    };
  }
}
