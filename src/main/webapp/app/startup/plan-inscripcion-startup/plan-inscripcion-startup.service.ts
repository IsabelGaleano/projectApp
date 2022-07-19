import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { Inscripciones } from './plan-inscripcion-startup.model';

@Injectable({ providedIn: 'root' })
export class PlanInscripcionStartupService {
  rootURL = '/api';

  constructor(private http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  registrarInscripcion(correo: string | null, tipo: string): Observable<any> {
    if (correo != null) {
      return this.http.get(this.rootURL.concat('/inscripciones/registrarInscripcion/').concat(correo.trim()).concat('/').concat(tipo));
    } else {
      return this.http.get(this.rootURL.concat('/inscripciones/'));
    }
  }
}
