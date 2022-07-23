import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { Registration } from './register.model';
import { Registro } from './registro-usuario-final.model';

const baseUrl = 'http://localhost:8080/api/usuarios';

@Injectable({ providedIn: 'root' })
export class RegisterService {
  constructor(private http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  save(registration: Registration, tipoUsuarioFinal: string): Observable<{}> {
    return this.http.post(this.applicationConfigService.getEndpointFor('api/register').concat('/', tipoUsuarioFinal), registration);
  }

  saveFinalUser(registro: Registro): Observable<{}> {
    return this.http.post(baseUrl, registro);
  }
}
