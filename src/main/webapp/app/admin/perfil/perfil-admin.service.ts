import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApplicationConfigService } from 'app/core/config/application-config.service';

@Injectable({
  providedIn: 'root',
})
export class PerfilAdminService {
  rootURL = '/api';

  constructor(private http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  getUsuariosByCorreoElectronico(correoElectronico: string): Observable<any> {
    const ruta = '/api/usuariosCorreoElectronico/' + correoElectronico;
    return this.http.get(ruta);
  }

  updateInfoBasicaUsuarios(correoUsuario: string, usuario: any): Observable<any> {
    const ruta = '/api/usuariosCorreo/' + correoUsuario;
    return this.http.put(ruta, usuario);
  }
  updateInfoBasicaJHI(jhi_user: any): Observable<any> {
    const ruta = '/api/admin/usersPerfil';
    return this.http.put(ruta, jhi_user);
  }

  save(currentPassword: string, newPassword: string): Observable<{}> {
    return this.http.post(this.applicationConfigService.getEndpointFor('api/account/change-password'), { currentPassword, newPassword });
  }

  updateContrasenniaUsuarios(correoElectronico: string, contrasenniaActual: string, contrasenniaNueva: string): Observable<any> {
    const ruta = '/api/usuariosContrasennia/' + correoElectronico;
    return this.http.put(ruta, contrasenniaNueva);
  }
}
