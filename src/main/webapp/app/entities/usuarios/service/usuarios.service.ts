import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IUsuarios, getUsuariosIdentifier } from '../usuarios.model';
import {getCodigosIdentifier, ICodigos} from "../../codigos/codigos.model";

export type EntityResponseType = HttpResponse<IUsuarios>;
export type EntityArrayResponseType = HttpResponse<IUsuarios[]>;

@Injectable({ providedIn: 'root' })
export class UsuariosService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/usuarios');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(usuarios: IUsuarios): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(usuarios);
    return this.http
      .post<IUsuarios>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(usuarios: IUsuarios): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(usuarios);
    return this.http
      .put<IUsuarios>(`${this.resourceUrl}/${getUsuariosIdentifier(usuarios) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(usuarios: IUsuarios): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(usuarios);
    return this.http
      .patch<IUsuarios>(`${this.resourceUrl}/${getUsuariosIdentifier(usuarios) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IUsuarios>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IUsuarios[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addUsuariosToCollectionIfMissing(usuariosCollection: IUsuarios[], ...usuariosToCheck: (IUsuarios | null | undefined)[]): IUsuarios[] {
    const usuarios: IUsuarios[] = usuariosToCheck.filter(isPresent);
    if (usuarios.length > 0) {
      const usuariosCollectionIdentifiers = usuariosCollection.map(usuariosItem => getUsuariosIdentifier(usuariosItem)!);
      const usuariosToAdd = usuarios.filter(usuariosItem => {
        const usuariosIdentifier = getUsuariosIdentifier(usuariosItem);
        if (usuariosIdentifier == null || usuariosCollectionIdentifiers.includes(usuariosIdentifier)) {
          return false;
        }
        usuariosCollectionIdentifiers.push(usuariosIdentifier);
        return true;
      });
      return [...usuariosToAdd, ...usuariosCollection];
    }
    return usuariosCollection;
  }

  protected convertDateFromClient(usuarios: IUsuarios): IUsuarios {
    return Object.assign({}, usuarios, {
      fechaNacimiento: usuarios.fechaNacimiento?.isValid() ? usuarios.fechaNacimiento.toJSON() : undefined,
    });
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.fechaNacimiento = res.body.fechaNacimiento ? dayjs(res.body.fechaNacimiento) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((usuarios: IUsuarios) => {
        usuarios.fechaNacimiento = usuarios.fechaNacimiento ? dayjs(usuarios.fechaNacimiento) : undefined;
      });
    }
    return res;
  }
}
