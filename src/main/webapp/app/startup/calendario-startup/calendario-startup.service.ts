import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CalendarioStartupService {
  rootURL = '/api/';

  constructor(private http: HttpClient) {}

  obtenerStartupPorEmail(email: string): Observable<any> {
    return this.http.get(this.rootURL.concat('startups/findbyCorreo/').concat(email));
  }

  obtenerReunionesPorIdStartup(idUsuario: string): Observable<any> {
    return this.http.get(this.rootURL.concat('reunionesByIdStartup/').concat(idUsuario));
  }
}
