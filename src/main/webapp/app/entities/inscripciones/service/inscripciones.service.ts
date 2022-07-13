import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IInscripciones, getInscripcionesIdentifier } from '../inscripciones.model';

export type EntityResponseType = HttpResponse<IInscripciones>;
export type EntityArrayResponseType = HttpResponse<IInscripciones[]>;

@Injectable({ providedIn: 'root' })
export class InscripcionesService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/inscripciones');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(inscripciones: IInscripciones): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(inscripciones);
    return this.http
      .post<IInscripciones>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(inscripciones: IInscripciones): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(inscripciones);
    return this.http
      .put<IInscripciones>(`${this.resourceUrl}/${getInscripcionesIdentifier(inscripciones) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(inscripciones: IInscripciones): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(inscripciones);
    return this.http
      .patch<IInscripciones>(`${this.resourceUrl}/${getInscripcionesIdentifier(inscripciones) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IInscripciones>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IInscripciones[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addInscripcionesToCollectionIfMissing(
    inscripcionesCollection: IInscripciones[],
    ...inscripcionesToCheck: (IInscripciones | null | undefined)[]
  ): IInscripciones[] {
    const inscripciones: IInscripciones[] = inscripcionesToCheck.filter(isPresent);
    if (inscripciones.length > 0) {
      const inscripcionesCollectionIdentifiers = inscripcionesCollection.map(
        inscripcionesItem => getInscripcionesIdentifier(inscripcionesItem)!
      );
      const inscripcionesToAdd = inscripciones.filter(inscripcionesItem => {
        const inscripcionesIdentifier = getInscripcionesIdentifier(inscripcionesItem);
        if (inscripcionesIdentifier == null || inscripcionesCollectionIdentifiers.includes(inscripcionesIdentifier)) {
          return false;
        }
        inscripcionesCollectionIdentifiers.push(inscripcionesIdentifier);
        return true;
      });
      return [...inscripcionesToAdd, ...inscripcionesCollection];
    }
    return inscripcionesCollection;
  }

  protected convertDateFromClient(inscripciones: IInscripciones): IInscripciones {
    return Object.assign({}, inscripciones, {
      fechaInicial: inscripciones.fechaInicial?.isValid() ? inscripciones.fechaInicial.toJSON() : undefined,
      fechaFinal: inscripciones.fechaFinal?.isValid() ? inscripciones.fechaFinal.toJSON() : undefined,
    });
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.fechaInicial = res.body.fechaInicial ? dayjs(res.body.fechaInicial) : undefined;
      res.body.fechaFinal = res.body.fechaFinal ? dayjs(res.body.fechaFinal) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((inscripciones: IInscripciones) => {
        inscripciones.fechaInicial = inscripciones.fechaInicial ? dayjs(inscripciones.fechaInicial) : undefined;
        inscripciones.fechaFinal = inscripciones.fechaFinal ? dayjs(inscripciones.fechaFinal) : undefined;
      });
    }
    return res;
  }
}
