import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IComentarios, getComentariosIdentifier } from '../comentarios.model';

export type EntityResponseType = HttpResponse<IComentarios>;
export type EntityArrayResponseType = HttpResponse<IComentarios[]>;

@Injectable({ providedIn: 'root' })
export class ComentariosService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/comentarios');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(comentarios: IComentarios): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(comentarios);
    return this.http
      .post<IComentarios>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(comentarios: IComentarios): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(comentarios);
    return this.http
      .put<IComentarios>(`${this.resourceUrl}/${getComentariosIdentifier(comentarios) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(comentarios: IComentarios): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(comentarios);
    return this.http
      .patch<IComentarios>(`${this.resourceUrl}/${getComentariosIdentifier(comentarios) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IComentarios>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IComentarios[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addComentariosToCollectionIfMissing(
    comentariosCollection: IComentarios[],
    ...comentariosToCheck: (IComentarios | null | undefined)[]
  ): IComentarios[] {
    const comentarios: IComentarios[] = comentariosToCheck.filter(isPresent);
    if (comentarios.length > 0) {
      const comentariosCollectionIdentifiers = comentariosCollection.map(comentariosItem => getComentariosIdentifier(comentariosItem)!);
      const comentariosToAdd = comentarios.filter(comentariosItem => {
        const comentariosIdentifier = getComentariosIdentifier(comentariosItem);
        if (comentariosIdentifier == null || comentariosCollectionIdentifiers.includes(comentariosIdentifier)) {
          return false;
        }
        comentariosCollectionIdentifiers.push(comentariosIdentifier);
        return true;
      });
      return [...comentariosToAdd, ...comentariosCollection];
    }
    return comentariosCollection;
  }

  protected convertDateFromClient(comentarios: IComentarios): IComentarios {
    return Object.assign({}, comentarios, {
      fecha: comentarios.fecha?.isValid() ? comentarios.fecha.toJSON() : undefined,
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
      res.body.forEach((comentarios: IComentarios) => {
        comentarios.fecha = comentarios.fecha ? dayjs(comentarios.fecha) : undefined;
      });
    }
    return res;
  }
}
