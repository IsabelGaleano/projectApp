/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApplicationConfigService } from 'app/core/config/application-config.service';

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

  getInscripcionStartup(correo: string | any): Observable<any> {
    if (correo != null) {
      return this.http.get(this.rootURL.concat('/inscripciones/inscripcionByStartup/', correo.toString()));
    } else {
      return this.http.get(this.rootURL.concat('/inscripciones'));
    }
  }
}
