import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';

import { IDonacionesPaquetes, DonacionesPaquetes } from '../donaciones-paquetes.model';
import { DonacionesPaquetesService } from '../service/donaciones-paquetes.service';
import { IStartups } from 'app/entities/startups/startups.model';
import { StartupsService } from 'app/entities/startups/service/startups.service';
import { IUsuarios } from 'app/entities/usuarios/usuarios.model';
import { UsuariosService } from 'app/entities/usuarios/service/usuarios.service';
import { IPaquetes } from 'app/entities/paquetes/paquetes.model';
import { PaquetesService } from 'app/entities/paquetes/service/paquetes.service';

@Component({
  selector: 'jhi-donaciones-paquetes-update',
  templateUrl: './donaciones-paquetes-update.component.html',
})
export class DonacionesPaquetesUpdateComponent implements OnInit {
  isSaving = false;

  startupsSharedCollection: IStartups[] = [];
  usuariosSharedCollection: IUsuarios[] = [];
  paquetesSharedCollection: IPaquetes[] = [];

  editForm = this.fb.group({
    id: [],
    descripcion: [null, [Validators.minLength(1), Validators.maxLength(300)]],
    montoEnvio: [],
    montoImpuesto: [],
    montoTotal: [],
    fechaDonacion: [],
    fechaEntrega: [],
    fechaPosibleEntrega: [],
    fechaInicialEnvio: [],
    diasRetraso: [],
    estado: [null, [Validators.minLength(1), Validators.maxLength(50)]],
    idStartup: [],
    idUsuario: [],
    idPaquete: [],
  });

  constructor(
    protected donacionesPaquetesService: DonacionesPaquetesService,
    protected startupsService: StartupsService,
    protected usuariosService: UsuariosService,
    protected paquetesService: PaquetesService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ donacionesPaquetes }) => {
      if (donacionesPaquetes.id === undefined) {
        const today = dayjs().startOf('day');
        donacionesPaquetes.fechaDonacion = today;
        donacionesPaquetes.fechaEntrega = today;
        donacionesPaquetes.fechaPosibleEntrega = today;
        donacionesPaquetes.fechaInicialEnvio = today;
      }

      this.updateForm(donacionesPaquetes);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const donacionesPaquetes = this.createFromForm();
    if (donacionesPaquetes.id !== undefined) {
      this.subscribeToSaveResponse(this.donacionesPaquetesService.update(donacionesPaquetes));
    } else {
      this.subscribeToSaveResponse(this.donacionesPaquetesService.create(donacionesPaquetes));
    }
  }

  trackStartupsById(_index: number, item: IStartups): number {
    return item.id!;
  }

  trackUsuariosById(_index: number, item: IUsuarios): number {
    return item.id!;
  }

  trackPaquetesById(_index: number, item: IPaquetes): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDonacionesPaquetes>>): void {
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

  protected updateForm(donacionesPaquetes: IDonacionesPaquetes): void {
    this.editForm.patchValue({
      id: donacionesPaquetes.id,
      descripcion: donacionesPaquetes.descripcion,
      montoEnvio: donacionesPaquetes.montoEnvio,
      montoImpuesto: donacionesPaquetes.montoImpuesto,
      montoTotal: donacionesPaquetes.montoTotal,
      fechaDonacion: donacionesPaquetes.fechaDonacion ? donacionesPaquetes.fechaDonacion.format(DATE_TIME_FORMAT) : null,
      fechaEntrega: donacionesPaquetes.fechaEntrega ? donacionesPaquetes.fechaEntrega.format(DATE_TIME_FORMAT) : null,
      fechaPosibleEntrega: donacionesPaquetes.fechaPosibleEntrega ? donacionesPaquetes.fechaPosibleEntrega.format(DATE_TIME_FORMAT) : null,
      fechaInicialEnvio: donacionesPaquetes.fechaInicialEnvio ? donacionesPaquetes.fechaInicialEnvio.format(DATE_TIME_FORMAT) : null,
      diasRetraso: donacionesPaquetes.diasRetraso,
      estado: donacionesPaquetes.estado,
      idStartup: donacionesPaquetes.idStartup,
      idUsuario: donacionesPaquetes.idUsuario,
      idPaquete: donacionesPaquetes.idPaquete,
    });

    this.startupsSharedCollection = this.startupsService.addStartupsToCollectionIfMissing(
      this.startupsSharedCollection,
      donacionesPaquetes.idStartup
    );
    this.usuariosSharedCollection = this.usuariosService.addUsuariosToCollectionIfMissing(
      this.usuariosSharedCollection,
      donacionesPaquetes.idUsuario
    );
    this.paquetesSharedCollection = this.paquetesService.addPaquetesToCollectionIfMissing(
      this.paquetesSharedCollection,
      donacionesPaquetes.idPaquete
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

    this.paquetesService
      .query()
      .pipe(map((res: HttpResponse<IPaquetes[]>) => res.body ?? []))
      .pipe(
        map((paquetes: IPaquetes[]) =>
          this.paquetesService.addPaquetesToCollectionIfMissing(paquetes, this.editForm.get('idPaquete')!.value)
        )
      )
      .subscribe((paquetes: IPaquetes[]) => (this.paquetesSharedCollection = paquetes));
  }

  protected createFromForm(): IDonacionesPaquetes {
    return {
      ...new DonacionesPaquetes(),
      id: this.editForm.get(['id'])!.value,
      descripcion: this.editForm.get(['descripcion'])!.value,
      montoEnvio: this.editForm.get(['montoEnvio'])!.value,
      montoImpuesto: this.editForm.get(['montoImpuesto'])!.value,
      montoTotal: this.editForm.get(['montoTotal'])!.value,
      fechaDonacion: this.editForm.get(['fechaDonacion'])!.value
        ? dayjs(this.editForm.get(['fechaDonacion'])!.value, DATE_TIME_FORMAT)
        : undefined,
      fechaEntrega: this.editForm.get(['fechaEntrega'])!.value
        ? dayjs(this.editForm.get(['fechaEntrega'])!.value, DATE_TIME_FORMAT)
        : undefined,
      fechaPosibleEntrega: this.editForm.get(['fechaPosibleEntrega'])!.value
        ? dayjs(this.editForm.get(['fechaPosibleEntrega'])!.value, DATE_TIME_FORMAT)
        : undefined,
      fechaInicialEnvio: this.editForm.get(['fechaInicialEnvio'])!.value
        ? dayjs(this.editForm.get(['fechaInicialEnvio'])!.value, DATE_TIME_FORMAT)
        : undefined,
      diasRetraso: this.editForm.get(['diasRetraso'])!.value,
      estado: this.editForm.get(['estado'])!.value,
      idStartup: this.editForm.get(['idStartup'])!.value,
      idUsuario: this.editForm.get(['idUsuario'])!.value,
      idPaquete: this.editForm.get(['idPaquete'])!.value,
    };
  }
}
