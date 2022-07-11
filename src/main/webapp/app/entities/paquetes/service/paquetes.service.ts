import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IPaquetes, getPaquetesIdentifier } from '../paquetes.model';

export type EntityResponseType = HttpResponse<IPaquetes>;
export type EntityArrayResponseType = HttpResponse<IPaquetes[]>;

@Injectable({ providedIn: 'root' })
export class PaquetesService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/paquetes');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(paquetes: IPaquetes): Observable<EntityResponseType> {
    return this.http.post<IPaquetes>(this.resourceUrl, paquetes, { observe: 'response' });
  }

  update(paquetes: IPaquetes): Observable<EntityResponseType> {
    return this.http.put<IPaquetes>(`${this.resourceUrl}/${getPaquetesIdentifier(paquetes) as number}`, paquetes, { observe: 'response' });
  }

  partialUpdate(paquetes: IPaquetes): Observable<EntityResponseType> {
    return this.http.patch<IPaquetes>(`${this.resourceUrl}/${getPaquetesIdentifier(paquetes) as number}`, paquetes, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IPaquetes>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPaquetes[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addPaquetesToCollectionIfMissing(paquetesCollection: IPaquetes[], ...paquetesToCheck: (IPaquetes | null | undefined)[]): IPaquetes[] {
    const paquetes: IPaquetes[] = paquetesToCheck.filter(isPresent);
    if (paquetes.length > 0) {
      const paquetesCollectionIdentifiers = paquetesCollection.map(paquetesItem => getPaquetesIdentifier(paquetesItem)!);
      const paquetesToAdd = paquetes.filter(paquetesItem => {
        const paquetesIdentifier = getPaquetesIdentifier(paquetesItem);
        if (paquetesIdentifier == null || paquetesCollectionIdentifiers.includes(paquetesIdentifier)) {
          return false;
        }
        paquetesCollectionIdentifiers.push(paquetesIdentifier);
        return true;
      });
      return [...paquetesToAdd, ...paquetesCollection];
    }
    return paquetesCollection;
  }
}
