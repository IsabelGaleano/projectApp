import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';

import { IStartups, Startups } from '../startups.model';
import { StartupsService } from '../service/startups.service';
import { IMonederos } from 'app/entities/monederos/monederos.model';
import { MonederosService } from 'app/entities/monederos/service/monederos.service';
import { ICategorias } from 'app/entities/categorias/categorias.model';
import { CategoriasService } from 'app/entities/categorias/service/categorias.service';

@Component({
  selector: 'jhi-startups-update',
  templateUrl: './startups-update.component.html',
})
export class StartupsUpdateComponent implements OnInit {
  isSaving = false;

  idMonederosCollection: IMonederos[] = [];
  categoriasSharedCollection: ICategorias[] = [];

  editForm = this.fb.group({
    id: [],
    nombreCorto: [null, [Validators.minLength(1), Validators.maxLength(50)]],
    nombreLargo: [null, [Validators.minLength(1), Validators.maxLength(200)]],
    correoElectronico: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(300)]],
    telefono: [null, [Validators.minLength(1), Validators.maxLength(50)]],
    contrasennia: [null, [Validators.minLength(1), Validators.maxLength(50)]],
    latitudDireccion: [null, [Validators.minLength(1), Validators.maxLength(50)]],
    longitudDireccion: [null, [Validators.minLength(1), Validators.maxLength(50)]],
    descripcion: [null, [Validators.minLength(1), Validators.maxLength(300)]],
    descripcionCorta: [null, [Validators.minLength(1), Validators.maxLength(200)]],
    beneficios: [null, [Validators.minLength(1), Validators.maxLength(4000)]],
    riesgos: [null, [Validators.minLength(1), Validators.maxLength(4000)]],
    panoramaMercado: [null, [Validators.minLength(1), Validators.maxLength(4000)]],
    montoMeta: [],
    tipoMeta: [null, [Validators.minLength(1), Validators.maxLength(50)]],
    linkSitioWeb: [null, [Validators.minLength(1), Validators.maxLength(300)]],
    imagenURL: [null, [Validators.minLength(1), Validators.maxLength(300)]],
    fechaCreacion: [],
    estado: [null, [Validators.minLength(1), Validators.maxLength(50)]],
    idMonedero: [],
    idCategoria: [],
  });

  constructor(
    protected startupsService: StartupsService,
    protected monederosService: MonederosService,
    protected categoriasService: CategoriasService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ startups }) => {
      if (startups.id === undefined) {
        const today = dayjs().startOf('day');
        startups.fechaCreacion = today;
      }

      this.updateForm(startups);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const startups = this.createFromForm();
    if (startups.id !== undefined) {
      this.subscribeToSaveResponse(this.startupsService.update(startups));
    } else {
      this.subscribeToSaveResponse(this.startupsService.create(startups));
    }
  }

  trackMonederosById(_index: number, item: IMonederos): number {
    return item.id!;
  }

  trackCategoriasById(_index: number, item: ICategorias): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IStartups>>): void {
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

  protected updateForm(startups: IStartups): void {
    this.editForm.patchValue({
      id: startups.id,
      nombreCorto: startups.nombreCorto,
      nombreLargo: startups.nombreLargo,
      correoElectronico: startups.correoElectronico,
      telefono: startups.telefono,
      contrasennia: startups.contrasennia,
      latitudDireccion: startups.latitudDireccion,
      longitudDireccion: startups.longitudDireccion,
      descripcion: startups.descripcion,
      descripcionCorta: startups.descripcionCorta,
      beneficios: startups.beneficios,
      riesgos: startups.riesgos,
      panoramaMercado: startups.panoramaMercado,
      montoMeta: startups.montoMeta,
      tipoMeta: startups.tipoMeta,
      linkSitioWeb: startups.linkSitioWeb,
      imagenURL: startups.imagenURL,
      fechaCreacion: startups.fechaCreacion ? startups.fechaCreacion.format(DATE_TIME_FORMAT) : null,
      estado: startups.estado,
      idMonedero: startups.idMonedero,
      idCategoria: startups.idCategoria,
    });

    this.idMonederosCollection = this.monederosService.addMonederosToCollectionIfMissing(this.idMonederosCollection, startups.idMonedero);
    this.categoriasSharedCollection = this.categoriasService.addCategoriasToCollectionIfMissing(
      this.categoriasSharedCollection,
      startups.idCategoria
    );
  }

  protected loadRelationshipsOptions(): void {
    this.monederosService
      .query({ filter: 'startups-is-null' })
      .pipe(map((res: HttpResponse<IMonederos[]>) => res.body ?? []))
      .pipe(
        map((monederos: IMonederos[]) =>
          this.monederosService.addMonederosToCollectionIfMissing(monederos, this.editForm.get('idMonedero')!.value)
        )
      )
      .subscribe((monederos: IMonederos[]) => (this.idMonederosCollection = monederos));

    this.categoriasService
      .query()
      .pipe(map((res: HttpResponse<ICategorias[]>) => res.body ?? []))
      .pipe(
        map((categorias: ICategorias[]) =>
          this.categoriasService.addCategoriasToCollectionIfMissing(categorias, this.editForm.get('idCategoria')!.value)
        )
      )
      .subscribe((categorias: ICategorias[]) => (this.categoriasSharedCollection = categorias));
  }

  protected createFromForm(): IStartups {
    return {
      ...new Startups(),
      id: this.editForm.get(['id'])!.value,
      nombreCorto: this.editForm.get(['nombreCorto'])!.value,
      nombreLargo: this.editForm.get(['nombreLargo'])!.value,
      correoElectronico: this.editForm.get(['correoElectronico'])!.value,
      telefono: this.editForm.get(['telefono'])!.value,
      contrasennia: this.editForm.get(['contrasennia'])!.value,
      latitudDireccion: this.editForm.get(['latitudDireccion'])!.value,
      longitudDireccion: this.editForm.get(['longitudDireccion'])!.value,
      descripcion: this.editForm.get(['descripcion'])!.value,
      descripcionCorta: this.editForm.get(['descripcionCorta'])!.value,
      beneficios: this.editForm.get(['beneficios'])!.value,
      riesgos: this.editForm.get(['riesgos'])!.value,
      panoramaMercado: this.editForm.get(['panoramaMercado'])!.value,
      montoMeta: this.editForm.get(['montoMeta'])!.value,
      tipoMeta: this.editForm.get(['tipoMeta'])!.value,
      linkSitioWeb: this.editForm.get(['linkSitioWeb'])!.value,
      imagenURL: this.editForm.get(['imagenURL'])!.value,
      fechaCreacion: this.editForm.get(['fechaCreacion'])!.value
        ? dayjs(this.editForm.get(['fechaCreacion'])!.value, DATE_TIME_FORMAT)
        : undefined,
      estado: this.editForm.get(['estado'])!.value,
      idMonedero: this.editForm.get(['idMonedero'])!.value,
      idCategoria: this.editForm.get(['idCategoria'])!.value,
    };
  }
}
