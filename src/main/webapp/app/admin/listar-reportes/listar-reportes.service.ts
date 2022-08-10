import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApplicationConfigService } from 'app/core/config/application-config.service';

@Injectable({ providedIn: 'root' })
export class ListarReportesAdminService {
  //rootURL = '/api';

  constructor(private http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  getUsuariosByCorreoElectronico(correoElectronico: string): Observable<any> {
    let ruta = '/api/usuariosCorreoElectronico/';
    ruta = ruta.concat(correoElectronico);
    return this.http.get(ruta);
  }
  getMovimientosByIdMonedero(id: number): Observable<any> {
    let ruta = '/api/movimientosByIdUsuario/';
    ruta = ruta.concat(id.toString());
    return this.http.get(ruta);
  }
  subirArchivo(file: any): Observable<any> {
    return this.http.post('https://api.cloudinary.com/v1_1/moonsoft//:resource_type/upload', file);
  }
}
