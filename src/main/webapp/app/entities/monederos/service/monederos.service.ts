import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IMonederos, getMonederosIdentifier } from '../monederos.model';

export type EntityResponseType = HttpResponse<IMonederos>;
export type EntityArrayResponseType = HttpResponse<IMonederos[]>;

@Injectable({ providedIn: 'root' })
export class MonederosService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/monederos');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(monederos: IMonederos): Observable<EntityResponseType> {
    return this.http.post<IMonederos>(this.resourceUrl, monederos, { observe: 'response' });
  }

  update(monederos: IMonederos): Observable<EntityResponseType> {
    return this.http.put<IMonederos>(`${this.resourceUrl}/${getMonederosIdentifier(monederos) as number}`, monederos, {
      observe: 'response',
    });
  }

  partialUpdate(monederos: IMonederos): Observable<EntityResponseType> {
    return this.http.patch<IMonederos>(`${this.resourceUrl}/${getMonederosIdentifier(monederos) as number}`, monederos, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IMonederos>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IMonederos[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addMonederosToCollectionIfMissing(
    monederosCollection: IMonederos[],
    ...monederosToCheck: (IMonederos | null | undefined)[]
  ): IMonederos[] {
    const monederos: IMonederos[] = monederosToCheck.filter(isPresent);
    if (monederos.length > 0) {
      const monederosCollectionIdentifiers = monederosCollection.map(monederosItem => getMonederosIdentifier(monederosItem)!);
      const monederosToAdd = monederos.filter(monederosItem => {
        const monederosIdentifier = getMonederosIdentifier(monederosItem);
        if (monederosIdentifier == null || monederosCollectionIdentifiers.includes(monederosIdentifier)) {
          return false;
        }
        monederosCollectionIdentifiers.push(monederosIdentifier);
        return true;
      });
      return [...monederosToAdd, ...monederosCollection];
    }
    return monederosCollection;
  }
}
