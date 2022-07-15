import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:8080/api/usuarios';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { Registro } from './registro-usuario-final.model';

@Injectable({ providedIn: 'root' })
export class RegistroUsuarioFinalService {
  constructor(private http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  save(registro: Registro): Observable<{}> {
    return this.http.post(baseUrl, registro);
  }
  // create(data: {
  //   nombre: string;
  //   cedula: string;
  //   primer_apellido: string;
  //   segundo_apellido: string;
  //   correo_electronico: string;
  //   genero: string;
  //   telefono: string;
  //   fecha_nacimiento: Date;
  //   latitud_direccion: string;
  //   longitud_direccion: string;
  //   imagen_url: string;
  //   tipo_usuario_final: string;
  //   contrasennia: string;
  //   estado: string;
  //   id_monedero_id: number;
  //   id_rol_id: number;
  // }): Observable<any> {
  //   return this.http.post(baseUrl, data);
  // }
}
