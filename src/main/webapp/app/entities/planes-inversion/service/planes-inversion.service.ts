import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IPlanesInversion, getPlanesInversionIdentifier } from '../planes-inversion.model';

export type EntityResponseType = HttpResponse<IPlanesInversion>;
export type EntityArrayResponseType = HttpResponse<IPlanesInversion[]>;

@Injectable({ providedIn: 'root' })
export class PlanesInversionService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/planes-inversions');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(planesInversion: IPlanesInversion): Observable<EntityResponseType> {
    return this.http.post<IPlanesInversion>(this.resourceUrl, planesInversion, { observe: 'response' });
  }

  update(planesInversion: IPlanesInversion): Observable<EntityResponseType> {
    return this.http.put<IPlanesInversion>(
      `${this.resourceUrl}/${getPlanesInversionIdentifier(planesInversion) as number}`,
      planesInversion,
      { observe: 'response' }
    );
  }

  partialUpdate(planesInversion: IPlanesInversion): Observable<EntityResponseType> {
    return this.http.patch<IPlanesInversion>(
      `${this.resourceUrl}/${getPlanesInversionIdentifier(planesInversion) as number}`,
      planesInversion,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IPlanesInversion>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPlanesInversion[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addPlanesInversionToCollectionIfMissing(
    planesInversionCollection: IPlanesInversion[],
    ...planesInversionsToCheck: (IPlanesInversion | null | undefined)[]
  ): IPlanesInversion[] {
    const planesInversions: IPlanesInversion[] = planesInversionsToCheck.filter(isPresent);
    if (planesInversions.length > 0) {
      const planesInversionCollectionIdentifiers = planesInversionCollection.map(
        planesInversionItem => getPlanesInversionIdentifier(planesInversionItem)!
      );
      const planesInversionsToAdd = planesInversions.filter(planesInversionItem => {
        const planesInversionIdentifier = getPlanesInversionIdentifier(planesInversionItem);
        if (planesInversionIdentifier == null || planesInversionCollectionIdentifiers.includes(planesInversionIdentifier)) {
          return false;
        }
        planesInversionCollectionIdentifiers.push(planesInversionIdentifier);
        return true;
      });
      return [...planesInversionsToAdd, ...planesInversionCollection];
    }
    return planesInversionCollection;
  }
}
