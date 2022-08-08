import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PerfilDonacionUsuarioService {
  rootURL = '/api';

  constructor(private http: HttpClient) {}

  getStartupByCorreo(correo: string | any): Observable<any> {
    return this.http.get(this.rootURL.concat('/startups/findbyCorreo/').concat(correo));
  }

  getDonacionPaquete(id: string | any): Observable<any> {
    if (id != null) {
      return this.http.get(this.rootURL.concat('/donaciones-paquetes/', id.toString()));
    } else {
      return this.http.get(this.rootURL.concat('/donaciones-paquetes/'));
    }
  }

  getPaquete(id: string | any): Observable<any> {
    return this.http.get(this.rootURL.concat('/paquetes/').concat(id));
  }

  getUbicaciones(donacion: Record<string, unknown>): Observable<any> {
    return this.http.post(this.rootURL.concat('/rastreadors/findByDonacionPaquete'), donacion);
  }
}
