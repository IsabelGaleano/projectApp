import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PlanesInversion } from './registro-plan-inversionista.model';

@Injectable({
  providedIn: 'root',
})
export class RegistroPlanInversionService {
  rootURL = '/api';

  constructor(private http: HttpClient) {}

  getUsersByMail(correo: string | null): Observable<any> {
    if (correo != null) {
      return this.http.get(this.rootURL.concat('/usuariosByCorreo/', correo.toString()));
    } else {
      return this.http.get(this.rootURL.concat('/usuarios'));
    }
  }

  savePlanInversion(plan_inversion: PlanesInversion): Observable<any> {
    return this.http.post(this.rootURL.concat('/planes-inversions'), plan_inversion);
  }
}
