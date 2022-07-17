import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApplicationConfigService } from 'app/core/config/application-config.service';

@Injectable({ providedIn: 'root' })
export class PagoInscripcionStartupService {
  rootURL = '/api';

  constructor(private http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  registrarInscripcionMonedero(tipo: string | null): Observable<any> {
    if (tipo != null) {
      return this.http.get(this.rootURL.concat('/monederos/agregarInscripcion/').concat(tipo));
    } else {
      return this.http.get(this.rootURL.concat('/monederos/'));
    }
  }
}
