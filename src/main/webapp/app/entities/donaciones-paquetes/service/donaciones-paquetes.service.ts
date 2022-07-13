import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IDonacionesPaquetes, getDonacionesPaquetesIdentifier } from '../donaciones-paquetes.model';

export type EntityResponseType = HttpResponse<IDonacionesPaquetes>;
export type EntityArrayResponseType = HttpResponse<IDonacionesPaquetes[]>;

@Injectable({ providedIn: 'root' })
export class DonacionesPaquetesService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/donaciones-paquetes');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(donacionesPaquetes: IDonacionesPaquetes): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(donacionesPaquetes);
    return this.http
      .post<IDonacionesPaquetes>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(donacionesPaquetes: IDonacionesPaquetes): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(donacionesPaquetes);
    return this.http
      .put<IDonacionesPaquetes>(`${this.resourceUrl}/${getDonacionesPaquetesIdentifier(donacionesPaquetes) as number}`, copy, {
        observe: 'response',
      })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(donacionesPaquetes: IDonacionesPaquetes): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(donacionesPaquetes);
    return this.http
      .patch<IDonacionesPaquetes>(`${this.resourceUrl}/${getDonacionesPaquetesIdentifier(donacionesPaquetes) as number}`, copy, {
        observe: 'response',
      })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IDonacionesPaquetes>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IDonacionesPaquetes[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addDonacionesPaquetesToCollectionIfMissing(
    donacionesPaquetesCollection: IDonacionesPaquetes[],
    ...donacionesPaquetesToCheck: (IDonacionesPaquetes | null | undefined)[]
  ): IDonacionesPaquetes[] {
    const donacionesPaquetes: IDonacionesPaquetes[] = donacionesPaquetesToCheck.filter(isPresent);
    if (donacionesPaquetes.length > 0) {
      const donacionesPaquetesCollectionIdentifiers = donacionesPaquetesCollection.map(
        donacionesPaquetesItem => getDonacionesPaquetesIdentifier(donacionesPaquetesItem)!
      );
      const donacionesPaquetesToAdd = donacionesPaquetes.filter(donacionesPaquetesItem => {
        const donacionesPaquetesIdentifier = getDonacionesPaquetesIdentifier(donacionesPaquetesItem);
        if (donacionesPaquetesIdentifier == null || donacionesPaquetesCollectionIdentifiers.includes(donacionesPaquetesIdentifier)) {
          return false;
        }
        donacionesPaquetesCollectionIdentifiers.push(donacionesPaquetesIdentifier);
        return true;
      });
      return [...donacionesPaquetesToAdd, ...donacionesPaquetesCollection];
    }
    return donacionesPaquetesCollection;
  }

  protected convertDateFromClient(donacionesPaquetes: IDonacionesPaquetes): IDonacionesPaquetes {
    return Object.assign({}, donacionesPaquetes, {
      fechaDonacion: donacionesPaquetes.fechaDonacion?.isValid() ? donacionesPaquetes.fechaDonacion.toJSON() : undefined,
      fechaEntrega: donacionesPaquetes.fechaEntrega?.isValid() ? donacionesPaquetes.fechaEntrega.toJSON() : undefined,
      fechaPosibleEntrega: donacionesPaquetes.fechaPosibleEntrega?.isValid() ? donacionesPaquetes.fechaPosibleEntrega.toJSON() : undefined,
      fechaInicialEnvio: donacionesPaquetes.fechaInicialEnvio?.isValid() ? donacionesPaquetes.fechaInicialEnvio.toJSON() : undefined,
    });
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.fechaDonacion = res.body.fechaDonacion ? dayjs(res.body.fechaDonacion) : undefined;
      res.body.fechaEntrega = res.body.fechaEntrega ? dayjs(res.body.fechaEntrega) : undefined;
      res.body.fechaPosibleEntrega = res.body.fechaPosibleEntrega ? dayjs(res.body.fechaPosibleEntrega) : undefined;
      res.body.fechaInicialEnvio = res.body.fechaInicialEnvio ? dayjs(res.body.fechaInicialEnvio) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((donacionesPaquetes: IDonacionesPaquetes) => {
        donacionesPaquetes.fechaDonacion = donacionesPaquetes.fechaDonacion ? dayjs(donacionesPaquetes.fechaDonacion) : undefined;
        donacionesPaquetes.fechaEntrega = donacionesPaquetes.fechaEntrega ? dayjs(donacionesPaquetes.fechaEntrega) : undefined;
        donacionesPaquetes.fechaPosibleEntrega = donacionesPaquetes.fechaPosibleEntrega
          ? dayjs(donacionesPaquetes.fechaPosibleEntrega)
          : undefined;
        donacionesPaquetes.fechaInicialEnvio = donacionesPaquetes.fechaInicialEnvio
          ? dayjs(donacionesPaquetes.fechaInicialEnvio)
          : undefined;
      });
    }
    return res;
  }
}
