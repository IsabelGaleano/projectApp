import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PlanesInversion } from './registro-plan-inversion.model';

@Injectable({
  providedIn: 'root',
})
export class RegistroPlanInversionService {
  rootURL = '/api';

  constructor(private http: HttpClient) {}

  getStartupsByMail(correo: string): Observable<any> {
    return this.http.get(this.rootURL.concat('/startups/findbyCorreo/', correo.toString()));
  }

  savePlanInversion(correo: string, porcentajeEmpresarial: string, plan_inversion: PlanesInversion): Observable<any> {
    return this.http.post(this.rootURL.concat('/planes-inversions-registro/', correo.concat('/', porcentajeEmpresarial)), plan_inversion);
  }
}
