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
    return this.http.get(this.rootURL.concat('/codigosByIdUsuario/', id.toString()));
  }

  getUsersByMail(correo: string | null): Observable<any> {
    if (correo != null) {
      return this.http.get(this.rootURL.concat('/usuariosByCorreo/', correo.toString()));
    } else {
      return this.http.get(this.rootURL.concat('/usuarios'));
    }
  }

  updateUsers(id: number, usuarios: Record<string, unknown>): Observable<any> {
    return this.http.put(this.rootURL.concat('/usuarios/', id.toString()), usuarios);
  }

  updateCodes(id: number, codigos: Record<string, unknown>): Observable<any> {
    return this.http.put(this.rootURL.concat('/codigos/', id.toString()), codigos);
  }

  reenviarCodes(id: number): Observable<any> {
    return this.http.get(this.rootURL.concat('/reenviarCodigo/', id.toString()));
  }
}
