import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IMensajes, getMensajesIdentifier } from '../mensajes.model';

export type EntityResponseType = HttpResponse<IMensajes>;
export type EntityArrayResponseType = HttpResponse<IMensajes[]>;

@Injectable({ providedIn: 'root' })
export class MensajesService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/mensajes');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(mensajes: IMensajes): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(mensajes);
    return this.http
      .post<IMensajes>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(mensajes: IMensajes): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(mensajes);
    return this.http
      .put<IMensajes>(`${this.resourceUrl}/${getMensajesIdentifier(mensajes) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(mensajes: IMensajes): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(mensajes);
    return this.http
      .patch<IMensajes>(`${this.resourceUrl}/${getMensajesIdentifier(mensajes) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IMensajes>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IMensajes[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addMensajesToCollectionIfMissing(mensajesCollection: IMensajes[], ...mensajesToCheck: (IMensajes | null | undefined)[]): IMensajes[] {
    const mensajes: IMensajes[] = mensajesToCheck.filter(isPresent);
    if (mensajes.length > 0) {
      const mensajesCollectionIdentifiers = mensajesCollection.map(mensajesItem => getMensajesIdentifier(mensajesItem)!);
      const mensajesToAdd = mensajes.filter(mensajesItem => {
        const mensajesIdentifier = getMensajesIdentifier(mensajesItem);
        if (mensajesIdentifier == null || mensajesCollectionIdentifiers.includes(mensajesIdentifier)) {
          return false;
        }
        mensajesCollectionIdentifiers.push(mensajesIdentifier);
        return true;
      });
      return [...mensajesToAdd, ...mensajesCollection];
    }
    return mensajesCollection;
  }

  protected convertDateFromClient(mensajes: IMensajes): IMensajes {
    return Object.assign({}, mensajes, {
      fecha: mensajes.fecha?.isValid() ? mensajes.fecha.toJSON() : undefined,
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
      res.body.forEach((mensajes: IMensajes) => {
        mensajes.fecha = mensajes.fecha ? dayjs(mensajes.fecha) : undefined;
      });
    }
    return res;
  }
}
