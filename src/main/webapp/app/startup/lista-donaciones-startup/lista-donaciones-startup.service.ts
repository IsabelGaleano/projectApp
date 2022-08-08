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
  getDonacionesPaquetesByNombreUsuario(correo: string | null, nombre: string | null): Observable<any> {
    if (correo != null && nombre != null) {
      return this.http.get(this.rootURL.concat('/donaciones-paquetesByUsuarioNombre/', correo.toString()).concat('/', nombre.toString()));
    } else {
      return this.http.get(this.rootURL.concat('/donaciones-paquetes'));
    }
  }
  getDonacionesPaquetesByCorreoUsuario(correo: string | null, correoUsuario: string | null): Observable<any> {
    if (correo != null && correoUsuario != null) {
      return this.http.get(
        this.rootURL.concat('/donaciones-paquetesByUsuarioCorreo/', correo.toString()).concat('/', correoUsuario.toString())
      );
    } else {
      return this.http.get(this.rootURL.concat('/donaciones-paquetes'));
    }
  }
  getDonacionesPaquetesByTipoUsuario(correo: string | null, tipo: string | null): Observable<any> {
    if (correo != null && tipo != null) {
      return this.http.get(this.rootURL.concat('/donaciones-paquetesByUsuarioTipo/', correo.toString()).concat('/', tipo.toString()));
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
