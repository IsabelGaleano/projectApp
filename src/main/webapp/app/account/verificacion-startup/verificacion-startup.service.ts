import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApplicationConfigService } from 'app/core/config/application-config.service';

@Injectable({ providedIn: 'root' })
export class VerificacionStartupService {
  rootURL = '/api';

  constructor(private http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  verificarCuenta(correo: string | null, codigo: string): Observable<any> {
    if (correo != null) {
      return this.http.get(this.rootURL.concat('/startups/verificarStartup/').concat(correo).concat('/').concat(codigo));
    } else {
      return this.http.get(this.rootURL.concat('/startups/'));
    }
  }
}
