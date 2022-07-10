import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';

import { IFacturas, Facturas } from '../facturas.model';
import { FacturasService } from '../service/facturas.service';
import { IDonacionesPaquetes } from 'app/entities/donaciones-paquetes/donaciones-paquetes.model';
import { DonacionesPaquetesService } from 'app/entities/donaciones-paquetes/service/donaciones-paquetes.service';
import { IStartups } from 'app/entities/startups/startups.model';
import { StartupsService } from 'app/entities/startups/service/startups.service';
import { IUsuarios } from 'app/entities/usuarios/usuarios.model';
import { UsuariosService } from 'app/entities/usuarios/service/usuarios.service';

@Component({
  selector: 'jhi-facturas-update',
  templateUrl: './facturas-update.component.html',
})
export class FacturasUpdateComponent implements OnInit {
  isSaving = false;

  idDonacionPaquetesCollection: IDonacionesPaquetes[] = [];
  startupsSharedCollection: IStartups[] = [];
  usuariosSharedCollection: IUsuarios[] = [];

  editForm = this.fb.group({
    id: [],
    monto: [],
    descripcion: [null, [Validators.minLength(1), Validators.maxLength(300)]],
    fecha: [],
    impuesto: [],
    adicional: [],
    nombreReceptor: [null, [Validators.minLength(1), Validators.maxLength(100)]],
    apellidoReceptor: [null, [Validators.minLength(1), Validators.maxLength(100)]],
    correoReceptor: [null, [Validators.minLength(1), Validators.maxLength(300)]],
    nombreStartup: [null, [Validators.minLength(1), Validators.maxLength(100)]],
    correoStartup: [null, [Validators.minLength(1), Validators.maxLength(300)]],
    estado: [null, [Validators.minLength(1), Validators.maxLength(50)]],
    idDonacionPaquete: [],
    idStartup: [],
    idUsuario: [],
  });

  constructor(
    protected facturasService: FacturasService,
    protected donacionesPaquetesService: DonacionesPaquetesService,
    protected startupsService: StartupsService,
    protected usuariosService: UsuariosService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ facturas }) => {
      if (facturas.id === undefined) {
        const today = dayjs().startOf('day');
        facturas.fecha = today;
      }

      this.updateForm(facturas);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const facturas = this.createFromForm();
    if (facturas.id !== undefined) {
      this.subscribeToSaveResponse(this.facturasService.update(facturas));
    } else {
      this.subscribeToSaveResponse(this.facturasService.create(facturas));
    }
  }

  trackDonacionesPaquetesById(_index: number, item: IDonacionesPaquetes): number {
    return item.id!;
  }

  trackStartupsById(_index: number, item: IStartups): number {
    return item.id!;
  }

  trackUsuariosById(_index: number, item: IUsuarios): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IFacturas>>): void {
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

  protected updateForm(facturas: IFacturas): void {
    this.editForm.patchValue({
      id: facturas.id,
      monto: facturas.monto,
      descripcion: facturas.descripcion,
      fecha: facturas.fecha ? facturas.fecha.format(DATE_TIME_FORMAT) : null,
      impuesto: facturas.impuesto,
      adicional: facturas.adicional,
      nombreReceptor: facturas.nombreReceptor,
      apellidoReceptor: facturas.apellidoReceptor,
      correoReceptor: facturas.correoReceptor,
      nombreStartup: facturas.nombreStartup,
      correoStartup: facturas.correoStartup,
      estado: facturas.estado,
      idDonacionPaquete: facturas.idDonacionPaquete,
      idStartup: facturas.idStartup,
      idUsuario: facturas.idUsuario,
    });

    this.idDonacionPaquetesCollection = this.donacionesPaquetesService.addDonacionesPaquetesToCollectionIfMissing(
      this.idDonacionPaquetesCollection,
      facturas.idDonacionPaquete
    );
    this.startupsSharedCollection = this.startupsService.addStartupsToCollectionIfMissing(
      this.startupsSharedCollection,
      facturas.idStartup
    );
    this.usuariosSharedCollection = this.usuariosService.addUsuariosToCollectionIfMissing(
      this.usuariosSharedCollection,
      facturas.idUsuario
    );
  }

  protected loadRelationshipsOptions(): void {
    this.donacionesPaquetesService
      .query({ filter: 'facturas-is-null' })
      .pipe(map((res: HttpResponse<IDonacionesPaquetes[]>) => res.body ?? []))
      .pipe(
        map((donacionesPaquetes: IDonacionesPaquetes[]) =>
          this.donacionesPaquetesService.addDonacionesPaquetesToCollectionIfMissing(
            donacionesPaquetes,
            this.editForm.get('idDonacionPaquete')!.value
          )
        )
      )
      .subscribe((donacionesPaquetes: IDonacionesPaquetes[]) => (this.idDonacionPaquetesCollection = donacionesPaquetes));

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

  protected createFromForm(): IFacturas {
    return {
      ...new Facturas(),
      id: this.editForm.get(['id'])!.value,
      monto: this.editForm.get(['monto'])!.value,
      descripcion: this.editForm.get(['descripcion'])!.value,
      fecha: this.editForm.get(['fecha'])!.value ? dayjs(this.editForm.get(['fecha'])!.value, DATE_TIME_FORMAT) : undefined,
      impuesto: this.editForm.get(['impuesto'])!.value,
      adicional: this.editForm.get(['adicional'])!.value,
      nombreReceptor: this.editForm.get(['nombreReceptor'])!.value,
      apellidoReceptor: this.editForm.get(['apellidoReceptor'])!.value,
      correoReceptor: this.editForm.get(['correoReceptor'])!.value,
      nombreStartup: this.editForm.get(['nombreStartup'])!.value,
      correoStartup: this.editForm.get(['correoStartup'])!.value,
      estado: this.editForm.get(['estado'])!.value,
      idDonacionPaquete: this.editForm.get(['idDonacionPaquete'])!.value,
      idStartup: this.editForm.get(['idStartup'])!.value,
      idUsuario: this.editForm.get(['idUsuario'])!.value,
    };
  }
}
