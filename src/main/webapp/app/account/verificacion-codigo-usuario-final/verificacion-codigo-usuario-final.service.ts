import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VerificacionCodigoUsuarioFinalService {
  rootURL = '/api';

  constructor(private http: HttpClient) {}

  getCodesById(id: number): Observable<any> {
    return this.http.get(this.rootURL + '/codigos/' + id);
  }
  getUsersByMail(correo: string | null): Observable<any> {
    return this.http.get(this.rootURL + '/usuarios/' + correo);
  }
}
