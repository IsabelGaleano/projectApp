/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { Startups } from 'app/entities/startups/startups.model';

@Injectable({ providedIn: 'root' })
export class PerfilStartupService {
  rootURL = '/api';

  constructor(private http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  getStartupByCorreo(correo: string | any): Observable<any> {
    if (correo != null) {
      return this.http.get(this.rootURL.concat('/startups/findbyCorreo/', correo.toString()));
    } else {
      return this.http.get(this.rootURL.concat('/startups'));
    }
  }

  getCategorias(): Observable<any> {
    return this.http.get(this.rootURL.concat('/categorias'));
  }

  getCategoriasByID(id: any): Observable<any> {
    return this.http.get(this.rootURL.concat('/categorias/', id.toString()));
  }

  getInscripcionStartup(correo: string | any): Observable<any> {
    if (correo != null) {
      return this.http.get(this.rootURL.concat('/inscripciones/inscripcionByStartup/', correo.toString()));
    } else {
      return this.http.get(this.rootURL.concat('/inscripciones'));
    }
  }

  actualizarStartup(id: number, startup: Record<string, unknown>): Observable<any> {
    return this.http.put(this.rootURL.concat('/startups/', id.toString()), startup);
  }

  savePassword(currentPassword: string, newPassword: string): Observable<{}> {
    return this.http.post(this.applicationConfigService.getEndpointFor('api/account/change-password'), { currentPassword, newPassword });
  }
}
