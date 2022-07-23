import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, ReplaySubject } from 'rxjs';

import { Account } from 'app/core/auth/account.model';

@Injectable({
  providedIn: 'root',
})
export class PerfilComercialStartupService {
  rootURL = '/api/';

  private authenticationState = new ReplaySubject<Account | null>(1);

  constructor(private http: HttpClient) {}

  getAuthenticationState(): Observable<Account | null> {
    return this.authenticationState.asObservable();
  }

  getUsuarioByCorreo(correo: string): Observable<any> {
    return this.http.get(this.rootURL.concat('usuariosCorreoElectronico/').concat(correo));
  }

  getStartupByCorreo(correo: string): Observable<any> {
    return this.http.get(this.rootURL.concat('startups/findbyCorreo/').concat(correo));
  }
}
