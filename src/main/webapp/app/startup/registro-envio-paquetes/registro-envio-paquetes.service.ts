import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, ReplaySubject } from 'rxjs';

import { Account } from 'app/core/auth/account.model';

@Injectable({
  providedIn: 'root',
})
export class RegistroEnvioPaqueteService {
  rootURL = '/api/';

  constructor(private http: HttpClient) {}

  getUsuarioByCorreo(correo: string | any): Observable<any> {
    return this.http.get(this.rootURL.concat('usuariosCorreoElectronico/').concat(correo));
  }

  getStartupByCorreo(correo: string | any): Observable<any> {
    return this.http.get(this.rootURL.concat('startups/findbyCorreo/').concat(correo));
  }

  getPaquete(id: string | any): Observable<any> {
    return this.http.get(this.rootURL.concat('paquetes/').concat(id));
  }

  registrarDonacion(paquete: Record<string, unknown>): Observable<any> {
    return this.http.post(this.rootURL.concat('donaciones-paquetes/'), paquete);
  }

  registrarUbicación(rastreador: Record<string, unknown>): Observable<any> {
    return this.http.post(this.rootURL.concat('rastreadors/'), rastreador);
  }
}
