import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ICodigos, getCodigosIdentifier } from '../codigos.model';

export type EntityResponseType = HttpResponse<ICodigos>;
export type EntityArrayResponseType = HttpResponse<ICodigos[]>;

@Injectable({ providedIn: 'root' })
export class CodigosService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/codigos');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(codigos: ICodigos): Observable<EntityResponseType> {
    return this.http.post<ICodigos>(this.resourceUrl, codigos, { observe: 'response' });
  }

  update(codigos: ICodigos): Observable<EntityResponseType> {
    return this.http.put<ICodigos>(`${this.resourceUrl}/${getCodigosIdentifier(codigos) as number}`, codigos, { observe: 'response' });
  }

  partialUpdate(codigos: ICodigos): Observable<EntityResponseType> {
    return this.http.patch<ICodigos>(`${this.resourceUrl}/${getCodigosIdentifier(codigos) as number}`, codigos, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICodigos>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICodigos[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addCodigosToCollectionIfMissing(codigosCollection: ICodigos[], ...codigosToCheck: (ICodigos | null | undefined)[]): ICodigos[] {
    const codigos: ICodigos[] = codigosToCheck.filter(isPresent);
    if (codigos.length > 0) {
      const codigosCollectionIdentifiers = codigosCollection.map(codigosItem => getCodigosIdentifier(codigosItem)!);
      const codigosToAdd = codigos.filter(codigosItem => {
        const codigosIdentifier = getCodigosIdentifier(codigosItem);
        if (codigosIdentifier == null || codigosCollectionIdentifiers.includes(codigosIdentifier)) {
          return false;
        }
        codigosCollectionIdentifiers.push(codigosIdentifier);
        return true;
      });
      return [...codigosToAdd, ...codigosCollection];
    }
    return codigosCollection;
  }

  sendCode(email: string): any {
    try {
      return this.http.post<any>(this.resourceUrl+'/send', email, { observe: 'response' });
    } catch (e) {
      return e;
    }
  }

  reSendCode(): any {
    try {
      return this.http.post<any>(this.resourceUrl+'/reSendCode', {}, { observe: 'response' });
    } catch (e) {
      return e;
    }
  }

  validate(code: string): any {
    try {
      return this.http.post<any>(this.resourceUrl+'/validate', code, { observe: 'response' });
    } catch (e) {
      return e;
    }
  }
}
