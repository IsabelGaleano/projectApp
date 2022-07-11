import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IReuniones, getReunionesIdentifier } from '../reuniones.model';

export type EntityResponseType = HttpResponse<IReuniones>;
export type EntityArrayResponseType = HttpResponse<IReuniones[]>;

@Injectable({ providedIn: 'root' })
export class ReunionesService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/reuniones');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(reuniones: IReuniones): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(reuniones);
    return this.http
      .post<IReuniones>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(reuniones: IReuniones): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(reuniones);
    return this.http
      .put<IReuniones>(`${this.resourceUrl}/${getReunionesIdentifier(reuniones) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(reuniones: IReuniones): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(reuniones);
    return this.http
      .patch<IReuniones>(`${this.resourceUrl}/${getReunionesIdentifier(reuniones) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IReuniones>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IReuniones[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addReunionesToCollectionIfMissing(
    reunionesCollection: IReuniones[],
    ...reunionesToCheck: (IReuniones | null | undefined)[]
  ): IReuniones[] {
    const reuniones: IReuniones[] = reunionesToCheck.filter(isPresent);
    if (reuniones.length > 0) {
      const reunionesCollectionIdentifiers = reunionesCollection.map(reunionesItem => getReunionesIdentifier(reunionesItem)!);
      const reunionesToAdd = reuniones.filter(reunionesItem => {
        const reunionesIdentifier = getReunionesIdentifier(reunionesItem);
        if (reunionesIdentifier == null || reunionesCollectionIdentifiers.includes(reunionesIdentifier)) {
          return false;
        }
        reunionesCollectionIdentifiers.push(reunionesIdentifier);
        return true;
      });
      return [...reunionesToAdd, ...reunionesCollection];
    }
    return reunionesCollection;
  }

  protected convertDateFromClient(reuniones: IReuniones): IReuniones {
    return Object.assign({}, reuniones, {
      fechaSolicitada: reuniones.fechaSolicitada?.isValid() ? reuniones.fechaSolicitada.toJSON() : undefined,
      fechaReunion: reuniones.fechaReunion?.isValid() ? reuniones.fechaReunion.toJSON() : undefined,
      horaReunion: reuniones.horaReunion?.isValid() ? reuniones.horaReunion.toJSON() : undefined,
    });
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.fechaSolicitada = res.body.fechaSolicitada ? dayjs(res.body.fechaSolicitada) : undefined;
      res.body.fechaReunion = res.body.fechaReunion ? dayjs(res.body.fechaReunion) : undefined;
      res.body.horaReunion = res.body.horaReunion ? dayjs(res.body.horaReunion) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((reuniones: IReuniones) => {
        reuniones.fechaSolicitada = reuniones.fechaSolicitada ? dayjs(reuniones.fechaSolicitada) : undefined;
        reuniones.fechaReunion = reuniones.fechaReunion ? dayjs(reuniones.fechaReunion) : undefined;
        reuniones.horaReunion = reuniones.horaReunion ? dayjs(reuniones.horaReunion) : undefined;
      });
    }
    return res;
  }
}
