import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApplicationConfigService } from 'app/core/config/application-config.service';

@Injectable({ providedIn: 'root' })
export class PerfilDonacionStartupPService {
  rootURL = '/api';

  constructor(private http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  getDonacionPaquete(id: string | any): Observable<any> {
    if (id != null) {
      return this.http.get(this.rootURL.concat('/donaciones-paquetes/', id.toString()));
    } else {
      return this.http.get(this.rootURL.concat('/donaciones-paquetes/'));
    }
  }

  getUsuarioByCorreo(correo: string | any): Observable<any> {
    return this.http.get(this.rootURL.concat('/usuariosCorreoElectronico/').concat(correo));
  }

  getStartupByCorreo(correo: string | any): Observable<any> {
    return this.http.get(this.rootURL.concat('/startups/findbyCorreo/').concat(correo));
  }

  getPaquete(id: string | any): Observable<any> {
    return this.http.get(this.rootURL.concat('/paquetes/').concat(id));
  }

  actualizarDonacion(id: string | any, donacion: Record<string, unknown>): Observable<any> {
    return this.http.put(this.rootURL.concat('/donaciones-paquetes/', id), donacion);
  }

  registrarUbicación(rastreador: Record<string, unknown>): Observable<any> {
    return this.http.post(this.rootURL.concat('/rastreadors/'), rastreador);
  }

  getUbicaciones(donacion: Record<string, unknown>): Observable<any> {
    return this.http.post(this.rootURL.concat('/rastreadors/findByDonacionPaquete'), donacion);
  }

  postNotificacionActualizacion(infoRastreador: Record<string, unknown>): Observable<any> {
    return this.http.post(this.rootURL.concat('/notificaciones/actualizarRastreador'), infoRastreador);
  }

  postNotificacionFinEnvio(infoRastreador: Record<string, unknown> | any): Observable<any> {
    return this.http.post(this.rootURL.concat('/notificaciones/finEnvioPaquete'), infoRastreador);
  }

  postNotificacionInicioEnvio(infoRastreador: Record<string, unknown> | any): Observable<any> {
    return this.http.post(this.rootURL.concat('/notificaciones/inicioEnvioPaquete'), infoRastreador);
  }

  actualizarRastreador(id: any, latitud: string, longitud: string): Observable<any> {
    if (id != null) {
      return this.http.get(
        this.rootURL.concat('/rastreadors/actualizarRastreador/').concat(id).concat('/').concat(latitud).concat('/').concat(longitud)
      );
    } else {
      return this.http.get(this.rootURL.concat('/rastreadors/'));
    }
  }
}
