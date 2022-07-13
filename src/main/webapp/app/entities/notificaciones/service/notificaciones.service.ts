import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { INotificaciones, getNotificacionesIdentifier } from '../notificaciones.model';

export type EntityResponseType = HttpResponse<INotificaciones>;
export type EntityArrayResponseType = HttpResponse<INotificaciones[]>;

@Injectable({ providedIn: 'root' })
export class NotificacionesService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/notificaciones');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(notificaciones: INotificaciones): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(notificaciones);
    return this.http
      .post<INotificaciones>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(notificaciones: INotificaciones): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(notificaciones);
    return this.http
      .put<INotificaciones>(`${this.resourceUrl}/${getNotificacionesIdentifier(notificaciones) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(notificaciones: INotificaciones): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(notificaciones);
    return this.http
      .patch<INotificaciones>(`${this.resourceUrl}/${getNotificacionesIdentifier(notificaciones) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<INotificaciones>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<INotificaciones[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addNotificacionesToCollectionIfMissing(
    notificacionesCollection: INotificaciones[],
    ...notificacionesToCheck: (INotificaciones | null | undefined)[]
  ): INotificaciones[] {
    const notificaciones: INotificaciones[] = notificacionesToCheck.filter(isPresent);
    if (notificaciones.length > 0) {
      const notificacionesCollectionIdentifiers = notificacionesCollection.map(
        notificacionesItem => getNotificacionesIdentifier(notificacionesItem)!
      );
      const notificacionesToAdd = notificaciones.filter(notificacionesItem => {
        const notificacionesIdentifier = getNotificacionesIdentifier(notificacionesItem);
        if (notificacionesIdentifier == null || notificacionesCollectionIdentifiers.includes(notificacionesIdentifier)) {
          return false;
        }
        notificacionesCollectionIdentifiers.push(notificacionesIdentifier);
        return true;
      });
      return [...notificacionesToAdd, ...notificacionesCollection];
    }
    return notificacionesCollection;
  }

  protected convertDateFromClient(notificaciones: INotificaciones): INotificaciones {
    return Object.assign({}, notificaciones, {
      fecha: notificaciones.fecha?.isValid() ? notificaciones.fecha.toJSON() : undefined,
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
      res.body.forEach((notificaciones: INotificaciones) => {
        notificaciones.fecha = notificaciones.fecha ? dayjs(notificaciones.fecha) : undefined;
      });
    }
    return res;
  }
}
