import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PerfilUsuarioFinalService {
  rootURL = '/api';

  constructor(private http: HttpClient) {}

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
}
