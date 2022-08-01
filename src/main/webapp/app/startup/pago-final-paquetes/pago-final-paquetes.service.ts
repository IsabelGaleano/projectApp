import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApplicationConfigService } from 'app/core/config/application-config.service';

@Injectable({ providedIn: 'root' })
export class PagoFinalPaqueteService {
  rootURL = '/api';

  constructor(private http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  getKeyPaypal(): Observable<any> {
    return this.http.get(this.rootURL.concat('/startups/keyPaypal'));
  }

  actualizarDonacion(id: string | null, donacion: Record<string, unknown>): Observable<any> {
    if (id != null) {
      return this.http.put(this.rootURL.concat('/donaciones-paquetes/').concat(id), donacion);
    } else {
      return this.http.get(this.rootURL.concat('/donaciones-paquetes/'));
    }
  }
}
