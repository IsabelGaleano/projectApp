import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IFacturas, getFacturasIdentifier } from '../facturas.model';

export type EntityResponseType = HttpResponse<IFacturas>;
export type EntityArrayResponseType = HttpResponse<IFacturas[]>;

@Injectable({ providedIn: 'root' })
export class FacturasService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/facturas');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(facturas: IFacturas): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(facturas);
    return this.http
      .post<IFacturas>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(facturas: IFacturas): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(facturas);
    return this.http
      .put<IFacturas>(`${this.resourceUrl}/${getFacturasIdentifier(facturas) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(facturas: IFacturas): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(facturas);
    return this.http
      .patch<IFacturas>(`${this.resourceUrl}/${getFacturasIdentifier(facturas) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IFacturas>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IFacturas[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addFacturasToCollectionIfMissing(facturasCollection: IFacturas[], ...facturasToCheck: (IFacturas | null | undefined)[]): IFacturas[] {
    const facturas: IFacturas[] = facturasToCheck.filter(isPresent);
    if (facturas.length > 0) {
      const facturasCollectionIdentifiers = facturasCollection.map(facturasItem => getFacturasIdentifier(facturasItem)!);
      const facturasToAdd = facturas.filter(facturasItem => {
        const facturasIdentifier = getFacturasIdentifier(facturasItem);
        if (facturasIdentifier == null || facturasCollectionIdentifiers.includes(facturasIdentifier)) {
          return false;
        }
        facturasCollectionIdentifiers.push(facturasIdentifier);
        return true;
      });
      return [...facturasToAdd, ...facturasCollection];
    }
    return facturasCollection;
  }

  protected convertDateFromClient(facturas: IFacturas): IFacturas {
    return Object.assign({}, facturas, {
      fecha: facturas.fecha?.isValid() ? facturas.fecha.toJSON() : undefined,
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
      res.body.forEach((facturas: IFacturas) => {
        facturas.fecha = facturas.fecha ? dayjs(facturas.fecha) : undefined;
      });
    }
    return res;
  }
}
