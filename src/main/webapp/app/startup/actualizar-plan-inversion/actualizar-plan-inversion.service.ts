import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ActualizarPlanInversionService {
  rootURL = '/api';

  constructor(private http: HttpClient) {}

  getPlanById(id: any): Observable<any> {
    return this.http.get(this.rootURL.concat('/planes-inversions/', id.toString()));
  }
  updatePlan(correo: string, id: any, porcentajeEmpresarial: string, data: any): Observable<any> {
    return this.http.put(
      this.rootURL.concat('/update-planes-inversions/', correo).concat('/', id.toString()).concat('/', porcentajeEmpresarial.toString()),
      data
    );
  }
  getStartupsByMail(correo: string): Observable<any> {
    return this.http.get(this.rootURL.concat('/startups/findbyCorreo/', correo.toString()));
  }
}
