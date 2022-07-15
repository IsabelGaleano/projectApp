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
    return this.http.get(this.rootURL.concat('/codigos/', id.toString()));
  }

  getUsersByMail(correo: string | null): Observable<any> {
    if (correo != null) {
      return this.http.get(this.rootURL.concat('/usuarios/', correo.toString()));
    } else {
      return this.http.get(this.rootURL.concat('/usuarios'));
    }
  }
}
