import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificacionesUsuariosService {
  rootURL = '/api';

  constructor(private http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  getUsuariosByCorreoElectronico(correoElectronico: string): Observable<any> {
    let ruta = '/api/usuariosCorreoElectronico/';
    ruta = ruta.concat(correoElectronico);
    return this.http.get(ruta);
  }

  getNotificacionesUsuario(correo: string | any): Observable<any> {
    return this.http.get(this.rootURL.concat('/notificaciones/notificacionesUsuario/').concat(correo));
  }

  getNotificacionesStartup(correo: string | any): Observable<any> {
    return this.http.get(this.rootURL.concat('/notificaciones/notificacionesStartup/').concat(correo));
  }

  getStartupLogin(correo: string | null): Observable<any> {
    if (correo !== null) {
      return this.http.get(this.rootURL.concat('/startups/findbyCorreo/').concat(correo));
    } else {
      return this.http.get(this.rootURL.concat('/startups/'));
    }
  }
}
