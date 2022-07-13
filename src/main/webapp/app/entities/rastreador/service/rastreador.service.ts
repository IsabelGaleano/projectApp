import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IRastreador, getRastreadorIdentifier } from '../rastreador.model';

export type EntityResponseType = HttpResponse<IRastreador>;
export type EntityArrayResponseType = HttpResponse<IRastreador[]>;

@Injectable({ providedIn: 'root' })
export class RastreadorService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/rastreadors');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(rastreador: IRastreador): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(rastreador);
    return this.http
      .post<IRastreador>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(rastreador: IRastreador): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(rastreador);
    return this.http
      .put<IRastreador>(`${this.resourceUrl}/${getRastreadorIdentifier(rastreador) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(rastreador: IRastreador): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(rastreador);
    return this.http
      .patch<IRastreador>(`${this.resourceUrl}/${getRastreadorIdentifier(rastreador) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IRastreador>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IRastreador[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addRastreadorToCollectionIfMissing(
    rastreadorCollection: IRastreador[],
    ...rastreadorsToCheck: (IRastreador | null | undefined)[]
  ): IRastreador[] {
    const rastreadors: IRastreador[] = rastreadorsToCheck.filter(isPresent);
    if (rastreadors.length > 0) {
      const rastreadorCollectionIdentifiers = rastreadorCollection.map(rastreadorItem => getRastreadorIdentifier(rastreadorItem)!);
      const rastreadorsToAdd = rastreadors.filter(rastreadorItem => {
        const rastreadorIdentifier = getRastreadorIdentifier(rastreadorItem);
        if (rastreadorIdentifier == null || rastreadorCollectionIdentifiers.includes(rastreadorIdentifier)) {
          return false;
        }
        rastreadorCollectionIdentifiers.push(rastreadorIdentifier);
        return true;
      });
      return [...rastreadorsToAdd, ...rastreadorCollection];
    }
    return rastreadorCollection;
  }

  protected convertDateFromClient(rastreador: IRastreador): IRastreador {
    return Object.assign({}, rastreador, {
      fecha: rastreador.fecha?.isValid() ? rastreador.fecha.toJSON() : undefined,
    });
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.fecha = res.body.fecha ? dayjs(res.body.fecha) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((rastreador: IRastreador) => {
        rastreador.fecha = rastreador.fecha ? dayjs(rastreador.fecha) : undefined;
      });
    }
    return res;
  }
}
