import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PerfilVisualizableStartupService {
  constructor(private http: HttpClient) {}

  getStartupByCorreo(correo: string): Observable<any> {
    const ruta = '/api/startups/findbyCorreo/';
    return this.http.get(ruta.concat(correo));
  }

  getInscripcionesByCorreoStartup(correo: string): Observable<any> {
    const ruta = '/api/inscripciones/inscripcionByStartup/';
    return this.http.get(ruta.concat(correo));
  }
}
