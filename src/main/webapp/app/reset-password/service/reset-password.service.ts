import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import {IUsuarios} from "../../entities/usuarios/usuarios.model";
import {IStartups} from "../../entities/startups/startups.model";

export type EntityResponseType = HttpResponse<IUsuarios>;
export type EntityArrayResponseType = HttpResponse<IUsuarios[]>;

@Injectable({ providedIn: 'root' })
export class ResetPasswordService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/usuarios');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  public updatePassword(newPassword: string, usuarios: IUsuarios): Observable<EntityResponseType> {
    usuarios.contrasennia = newPassword;
    return this.http.post<IUsuarios>(`${this.resourceUrl}/resetPassword`, usuarios, { observe: 'response' });
  }

  public updatePasswordStartups(newPassword: string, usuarios: IStartups): Observable<EntityResponseType> {
    usuarios.contrasennia = newPassword;
    return this.http.post<IUsuarios>(`${this.resourceUrl}/resetPasswordStartups`, usuarios, { observe: 'response' });
  }
}
