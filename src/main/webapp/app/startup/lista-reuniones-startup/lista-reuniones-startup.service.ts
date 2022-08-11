import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ListaReunionesStartupService {
  rootURL = '/api/';

  constructor(private http: HttpClient) {}

  obtenerIdStartupPorEmail(email: string): Observable<any> {
    return this.http.get(this.rootURL.concat('startups/findbyCorreo/').concat(email));
  }

  //Obtener reuniones
  obtenerReuniones(idStartup: string): Observable<any> {
    return this.http.get(this.rootURL.concat('reunionesByIdStartup/').concat(idStartup));
  }

  //Aceptar reunion
  aceptarReunion(idReunion: string, estado: string): Observable<any> {
    return this.http.put(this.rootURL.concat('aceptarReunion/').concat(idReunion), estado);
  }

  //Actualizar estado reunion
  actualizarEstadoReunion(idReunion: string, estado: string): Observable<any> {
    return this.http.put(this.rootURL.concat('actualizarReuniones/').concat(idReunion), estado);
  }
}
