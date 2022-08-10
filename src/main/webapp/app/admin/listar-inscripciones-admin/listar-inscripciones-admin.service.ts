import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApplicationConfigService } from 'app/core/config/application-config.service';

@Injectable({ providedIn: 'root' })
export class ListarInscripcionesAdminService {
  //rootURL = '/api';

  constructor(private http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  ListarInscripcionesAdmin(): Observable<any> {
    return this.http.get('/api/inscripciones');
  }
  getInscripcionById(id: string): Observable<any> {
    let ruta = '/api/inscripciones/';
    ruta = ruta.concat(id);
    return this.http.get(ruta);
  }
  updateInscripcionesEstado(id: string, estado: string): any {
    let ruta = '/api/inscripciones/estado/';
    ruta = ruta.concat(id);
    return this.http.put(ruta, estado);
  }

  findByNombre(nombre: string):  Observable<any> {
    let ruta = '/api/inscripciones/findInscripcionessByNombre/';
    ruta = ruta + nombre;
    return this.http.get(ruta);
  }
}
