/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { Paquetes } from 'app/entities/paquetes/paquetes.model';

@Injectable({ providedIn: 'root' })
export class RegistrarPaqueteStartupService {
  rootURL = '/api';

  constructor(private http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  registrarPaquete(paquetes: Paquetes): Observable<any> {
    if (paquetes != null) {
      return this.http.post(this.rootURL.concat('/paquetes'), paquetes);
    } else {
      return this.http.get(this.rootURL.concat('/inscripciones/'));
    }
  }

  getStartupByCorreo(correo: string | null): Observable<any> {
    if (correo != null) {
      return this.http.get(this.rootURL.concat('/startups/findbyCorreo/', correo.toString()));
    } else {
      return this.http.get(this.rootURL.concat('/startups'));
    }
  }
}
