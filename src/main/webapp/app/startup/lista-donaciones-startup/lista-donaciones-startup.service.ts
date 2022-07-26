import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ListaDonacionesStartupService {
  rootURL = '/api';

  constructor(private http: HttpClient) {}

  getDonacionesPaquetesByCorreo(correo: string | null): Observable<any> {
    if (correo != null) {
      return this.http.get(this.rootURL.concat('/donaciones-paquetesByStartupCorreo/', correo.toString()));
    } else {
      return this.http.get(this.rootURL.concat('/donaciones-paquetes'));
    }
  }
}
