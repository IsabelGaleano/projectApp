import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IMovimientos, getMovimientosIdentifier } from '../movimientos.model';

export type EntityResponseType = HttpResponse<IMovimientos>;
export type EntityArrayResponseType = HttpResponse<IMovimientos[]>;

@Injectable({ providedIn: 'root' })
export class MovimientosService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/movimientos');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(movimientos: IMovimientos): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(movimientos);
    return this.http
      .post<IMovimientos>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(movimientos: IMovimientos): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(movimientos);
    return this.http
      .put<IMovimientos>(`${this.resourceUrl}/${getMovimientosIdentifier(movimientos) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(movimientos: IMovimientos): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(movimientos);
    return this.http
      .patch<IMovimientos>(`${this.resourceUrl}/${getMovimientosIdentifier(movimientos) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IMovimientos>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IMovimientos[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addMovimientosToCollectionIfMissing(
    movimientosCollection: IMovimientos[],
    ...movimientosToCheck: (IMovimientos | null | undefined)[]
  ): IMovimientos[] {
    const movimientos: IMovimientos[] = movimientosToCheck.filter(isPresent);
    if (movimientos.length > 0) {
      const movimientosCollectionIdentifiers = movimientosCollection.map(movimientosItem => getMovimientosIdentifier(movimientosItem)!);
      const movimientosToAdd = movimientos.filter(movimientosItem => {
        const movimientosIdentifier = getMovimientosIdentifier(movimientosItem);
        if (movimientosIdentifier == null || movimientosCollectionIdentifiers.includes(movimientosIdentifier)) {
          return false;
        }
        movimientosCollectionIdentifiers.push(movimientosIdentifier);
        return true;
      });
      return [...movimientosToAdd, ...movimientosCollection];
    }
    return movimientosCollection;
  }

  protected convertDateFromClient(movimientos: IMovimientos): IMovimientos {
    return Object.assign({}, movimientos, {
      fecha: movimientos.fecha?.isValid() ? movimientos.fecha.toJSON() : undefined,
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
      res.body.forEach((movimientos: IMovimientos) => {
        movimientos.fecha = movimientos.fecha ? dayjs(movimientos.fecha) : undefined;
      });
    }
    return res;
  }
}
