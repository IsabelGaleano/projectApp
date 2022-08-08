import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Documentos } from 'app/entities/documentos/documentos.model';
import { ApplicationConfigService } from 'app/core/config/application-config.service';

@Injectable({
  providedIn: 'root',
})
export class PerfilUsuarioFinalService {
  rootURL = '/api';

  constructor(private http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  getMovimientosByIdMonedero(id: string): Observable<any> {
    let ruta = '/api/movimientosByIdUsuario/';
    ruta = ruta.concat(id);
    return this.http.get(ruta);
  }

  getUsersByMail(correo: string | null): Observable<any> {
    if (correo != null) {
      return this.http.get(this.rootURL.concat('/usuariosByCorreo/', correo.toString()));
    } else {
      return this.http.get(this.rootURL.concat('/usuarios'));
    }
  }
  postImagenCloudinary(documento: Documentos): Observable<any> {
    return this.http.post(this.rootURL.concat('/usuarios/uploadImage'), documento);
  }
  updateUsers(id: number, usuarios: Record<string, unknown>): Observable<any> {
    return this.http.put(this.rootURL.concat('/usuarios/', id.toString()), usuarios);
  }

  save(currentPassword: string, newPassword: string): Observable<{}> {
    return this.http.post(this.applicationConfigService.getEndpointFor('api/account/change-password'), { currentPassword, newPassword });
  }

  subirImagen(imageFormData: FormData): Observable<any> {
    return this.http.post('https://api.cloudinary.com/v1_1/moonsoft/image/upload', imageFormData);
  }

  actualizarImagen(correoElectronico: string, imagen: string): Observable<any> {
    const ruta = '/api/usuarios/actualizarImagen/';
    return this.http.put(ruta.concat(correoElectronico), imagen);
  }
}
