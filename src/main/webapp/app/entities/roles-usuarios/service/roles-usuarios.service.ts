import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IRolesUsuarios, getRolesUsuariosIdentifier } from '../roles-usuarios.model';

export type EntityResponseType = HttpResponse<IRolesUsuarios>;
export type EntityArrayResponseType = HttpResponse<IRolesUsuarios[]>;

@Injectable({ providedIn: 'root' })
export class RolesUsuariosService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/roles-usuarios');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(rolesUsuarios: IRolesUsuarios): Observable<EntityResponseType> {
    return this.http.post<IRolesUsuarios>(this.resourceUrl, rolesUsuarios, { observe: 'response' });
  }

  update(rolesUsuarios: IRolesUsuarios): Observable<EntityResponseType> {
    return this.http.put<IRolesUsuarios>(`${this.resourceUrl}/${getRolesUsuariosIdentifier(rolesUsuarios) as number}`, rolesUsuarios, {
      observe: 'response',
    });
  }

  partialUpdate(rolesUsuarios: IRolesUsuarios): Observable<EntityResponseType> {
    return this.http.patch<IRolesUsuarios>(`${this.resourceUrl}/${getRolesUsuariosIdentifier(rolesUsuarios) as number}`, rolesUsuarios, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IRolesUsuarios>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IRolesUsuarios[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addRolesUsuariosToCollectionIfMissing(
    rolesUsuariosCollection: IRolesUsuarios[],
    ...rolesUsuariosToCheck: (IRolesUsuarios | null | undefined)[]
  ): IRolesUsuarios[] {
    const rolesUsuarios: IRolesUsuarios[] = rolesUsuariosToCheck.filter(isPresent);
    if (rolesUsuarios.length > 0) {
      const rolesUsuariosCollectionIdentifiers = rolesUsuariosCollection.map(
        rolesUsuariosItem => getRolesUsuariosIdentifier(rolesUsuariosItem)!
      );
      const rolesUsuariosToAdd = rolesUsuarios.filter(rolesUsuariosItem => {
        const rolesUsuariosIdentifier = getRolesUsuariosIdentifier(rolesUsuariosItem);
        if (rolesUsuariosIdentifier == null || rolesUsuariosCollectionIdentifiers.includes(rolesUsuariosIdentifier)) {
          return false;
        }
        rolesUsuariosCollectionIdentifiers.push(rolesUsuariosIdentifier);
        return true;
      });
      return [...rolesUsuariosToAdd, ...rolesUsuariosCollection];
    }
    return rolesUsuariosCollection;
  }
}
