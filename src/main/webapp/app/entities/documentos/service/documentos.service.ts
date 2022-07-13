import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IDocumentos, getDocumentosIdentifier } from '../documentos.model';

export type EntityResponseType = HttpResponse<IDocumentos>;
export type EntityArrayResponseType = HttpResponse<IDocumentos[]>;

@Injectable({ providedIn: 'root' })
export class DocumentosService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/documentos');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(documentos: IDocumentos): Observable<EntityResponseType> {
    return this.http.post<IDocumentos>(this.resourceUrl, documentos, { observe: 'response' });
  }

  update(documentos: IDocumentos): Observable<EntityResponseType> {
    return this.http.put<IDocumentos>(`${this.resourceUrl}/${getDocumentosIdentifier(documentos) as number}`, documentos, {
      observe: 'response',
    });
  }

  partialUpdate(documentos: IDocumentos): Observable<EntityResponseType> {
    return this.http.patch<IDocumentos>(`${this.resourceUrl}/${getDocumentosIdentifier(documentos) as number}`, documentos, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IDocumentos>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDocumentos[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addDocumentosToCollectionIfMissing(
    documentosCollection: IDocumentos[],
    ...documentosToCheck: (IDocumentos | null | undefined)[]
  ): IDocumentos[] {
    const documentos: IDocumentos[] = documentosToCheck.filter(isPresent);
    if (documentos.length > 0) {
      const documentosCollectionIdentifiers = documentosCollection.map(documentosItem => getDocumentosIdentifier(documentosItem)!);
      const documentosToAdd = documentos.filter(documentosItem => {
        const documentosIdentifier = getDocumentosIdentifier(documentosItem);
        if (documentosIdentifier == null || documentosCollectionIdentifiers.includes(documentosIdentifier)) {
          return false;
        }
        documentosCollectionIdentifiers.push(documentosIdentifier);
        return true;
      });
      return [...documentosToAdd, ...documentosCollection];
    }
    return documentosCollection;
  }
}
