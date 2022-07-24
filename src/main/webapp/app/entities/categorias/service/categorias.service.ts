import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ICategorias, getCategoriasIdentifier } from '../categorias.model';

export type EntityResponseType = HttpResponse<ICategorias>;
export type EntityArrayResponseType = HttpResponse<ICategorias[]>;

@Injectable({ providedIn: 'root' })
export class CategoriasService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/categorias');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(categorias: ICategorias): Observable<EntityResponseType> {
    return this.http.post<ICategorias>(this.resourceUrl, categorias, { observe: 'response' });
  }

  update(categorias: ICategorias): Observable<EntityResponseType> {
    return this.http.put<ICategorias>(`${this.resourceUrl}/${getCategoriasIdentifier(categorias) as number}`, categorias, {
      observe: 'response',
    });
  }

  partialUpdate(categorias: ICategorias): Observable<EntityResponseType> {
    return this.http.patch<ICategorias>(`${this.resourceUrl}/${getCategoriasIdentifier(categorias) as number}`, categorias, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICategorias>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  get(): Observable<EntityResponseType> {
    return this.http.get<ICategorias>(`${this.resourceUrl}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICategorias[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addCategoriasToCollectionIfMissing(
    categoriasCollection: ICategorias[],
    ...categoriasToCheck: (ICategorias | null | undefined)[]
  ): ICategorias[] {
    const categorias: ICategorias[] = categoriasToCheck.filter(isPresent);
    if (categorias.length > 0) {
      const categoriasCollectionIdentifiers = categoriasCollection.map(categoriasItem => getCategoriasIdentifier(categoriasItem)!);
      const categoriasToAdd = categorias.filter(categoriasItem => {
        const categoriasIdentifier = getCategoriasIdentifier(categoriasItem);
        if (categoriasIdentifier == null || categoriasCollectionIdentifiers.includes(categoriasIdentifier)) {
          return false;
        }
        categoriasCollectionIdentifiers.push(categoriasIdentifier);
        return true;
      });
      return [...categoriasToAdd, ...categoriasCollection];
    }
    return categoriasCollection;
  }
}
