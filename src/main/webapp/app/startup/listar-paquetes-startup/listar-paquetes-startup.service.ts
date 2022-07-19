import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApplicationConfigService } from 'app/core/config/application-config.service';

@Injectable({ providedIn: 'root' })
export class ListarPaquetesStartupService {
  rootURL = '/api';

  constructor(private http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  listarPaquetesStartups(correo: string | null): Observable<any> {
    if (correo != null) {
      return this.http.get(this.rootURL.concat('/paquetes/paquetesStartups/').concat(correo));
    } else {
      return this.http.get(this.rootURL.concat('/paquetes/'));
    }
  }
}
