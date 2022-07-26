import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ListaDonacionesUsuarioService {
  rootURL = '/api';

  constructor(private http: HttpClient) {}

  getDonacionesPaquetesByCorreo(correo: string | null): Observable<any> {
    if (correo != null) {
      return this.http.get(this.rootURL.concat('/donaciones-paquetesByUsuarioCorreo/', correo.toString()));
    } else {
      return this.http.get(this.rootURL.concat('/donaciones-paquetes'));
    }
  }
}
