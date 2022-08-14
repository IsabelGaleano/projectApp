import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ListaReunionesService {
  rootURL = '/api/';

  constructor(private http: HttpClient) {}

  //Obtener id usuario por email
  obtenerIdUsuarioPorEmail(email: string): Observable<any> {
    return this.http.get(this.rootURL.concat('usuariosCorreoElectronico/').concat(email));
  }

  //Obtener reuniones
  obtenerReuniones(idUsuario: string): Observable<any> {
    return this.http.get(this.rootURL.concat('reunionesByIdUsuario/').concat(idUsuario));
  }

  //Aceptar reunion
  aceptarReunion(idReunion: string, estado: string): Observable<any> {
    return this.http.put(this.rootURL.concat('aceptarReunion/').concat(idReunion), estado);
  }

  //Actualizar estado reunion
  actualizarEstadoReunion(idReunion: string, estado: string): Observable<any> {
    return this.http.put(this.rootURL.concat('actualizarReuniones/').concat(idReunion), estado);
  }
  findByNombre(nombre: string): Observable<any> {
    let ruta = '/api/reuniones/findReunionByStartup/';
    ruta = ruta + nombre;
    return this.http.get(ruta);
  }
}
