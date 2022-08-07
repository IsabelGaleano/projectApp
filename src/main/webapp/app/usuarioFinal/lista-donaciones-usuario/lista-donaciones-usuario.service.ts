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
  getDonacionesPaquetesByNombreStartup(correo: string | null, nombre: string | null): Observable<any> {
    if (correo != null && nombre != null) {
      return this.http.get(this.rootURL.concat('/donaciones-paquetesByStartupNombre/', correo.toString()).concat('/', nombre.toString()));
    } else {
      return this.http.get(this.rootURL.concat('/donaciones-paquetes'));
    }
  }
  getDonacionesPaquetesByCorreoStartup(correo: string | null, correoStartup: string | null): Observable<any> {
    if (correo != null && correoStartup != null) {
      return this.http.get(
        this.rootURL.concat('/donaciones-paquetesByStartupCorreo/', correo.toString()).concat('/', correoStartup.toString())
      );
    } else {
      return this.http.get(this.rootURL.concat('/donaciones-paquetes'));
    }
  }

  getDonacionPaquete(id: string | any): Observable<any> {
    if (id != null) {
      return this.http.get(this.rootURL.concat('/donaciones-paquetes/', id.toString()));
    } else {
      return this.http.get(this.rootURL.concat('/donaciones-paquetes/'));
    }
  }
}
