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

  getMovimientosByIdMonedero(id: string): Observable<any> {
    let ruta = '/api/movimientosByIdUsuario/';
    ruta = ruta.concat(id);
    return this.http.get(ruta);
  }

  getUsuariosByCorreoElectronico(correoElectronico: string): Observable<any> {
    let ruta = '/api/usuariosCorreoElectronico/';
    ruta = ruta.concat(correoElectronico);
    return this.http.get(ruta);
  }

  updateInfoBasicaUsuarios(correoUsuario: string, usuario: any): Observable<any> {
    let ruta = '/api/usuariosCorreo/';
    ruta = ruta.concat(correoUsuario);
    return this.http.put(ruta, usuario);
  }
  updateInfoBasicaJHI(jhi_user: any): Observable<any> {
    const ruta = '/api/admin/usersPerfil';
    return this.http.put(ruta, jhi_user);
  }

  save(currentPassword: string, newPassword: string): Observable<{}> {
    return this.http.post(this.applicationConfigService.getEndpointFor('api/account/change-password'), { currentPassword, newPassword });
  }

  // updateContrasenniaUsuarios(correoElectronico: string, contrasenniaActual: string, contrasenniaNueva: string): Observable<any> {
  //   const ruta = '/api/usuariosContrasennia/' + correoElectronico;
  //   return this.http.put(ruta, contrasenniaNueva);
  // }

  subirImagen(imageFormData: FormData): Observable<any> {
    return this.http.post('https://api.cloudinary.com/v1_1/moonsoft/image/upload', imageFormData);
  }

  actualizarImagen(correoElectronico: string, imagen: string): Observable<any> {
    const ruta = '/api/usuarios/actualizarImagen/';
    return this.http.put(ruta.concat(correoElectronico), imagen);
  }
}
