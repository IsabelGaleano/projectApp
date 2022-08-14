import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CalendarioInversionistaService {
  rootURL = '/api/';

  constructor(private http: HttpClient) {}

  obtenerUsuarioPorEmail(email: string): Observable<any> {
    return this.http.get(this.rootURL.concat('usuariosCorreoElectronico/').concat(email));
  }

  obtenerReunionesPorIdUsuario(idUsuario: string): Observable<any> {
    return this.http.get(this.rootURL.concat('reunionesByIdUsuario/').concat(idUsuario));
  }
}
