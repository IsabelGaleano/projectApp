import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, ReplaySubject } from 'rxjs';

import { Account } from 'app/core/auth/account.model';
import { Startups } from 'app/entities/startups/startups.model';
import { Votos } from 'app/entities/votos/votos.model';

@Injectable({
  providedIn: 'root',
})
export class PerfilComercialStartupService {
  rootURL = '/api/';

  private authenticationState = new ReplaySubject<Account | null>(1);

  constructor(private http: HttpClient) {}

  getAuthenticationState(): Observable<Account | null> {
    return this.authenticationState.asObservable();
  }

  getUsuarioByCorreo(correo: string): Observable<any> {
    return this.http.get(this.rootURL.concat('usuariosCorreoElectronico/').concat(correo));
  }

  getStartupByCorreo(correo: string): Observable<any> {
    return this.http.get(this.rootURL.concat('startups/findbyCorreo/').concat(correo));
  }

  getPlanesDeInversionByCorreoStartup(correo: string): Observable<any> {
    return this.http.get(this.rootURL.concat('planes-inversionsByCorreo/').concat(correo));
  }

  getPaquetesByCorreoStartup(correo: string): Observable<any> {
    return this.http.get(this.rootURL.concat('paquetes/paquetesStartups/').concat(correo));
  }

  //Votos
  getVotosByStartup(id: string): Observable<any> {
    return this.http.get(this.rootURL.concat('votos/startup/').concat(id));
  }
  getVotosPorStartup(startup: Startups): Observable<any> {
    return this.http.post(this.rootURL.concat('votosStartup'), startup);
  }

  //Voto
  getVotosByStartupAndUsuario(idStartup: string, idUsuario: string): Observable<any> {
    return this.http.get(this.rootURL.concat('votos/startupAndUsuario/').concat(idStartup).concat('/').concat(idUsuario));
  }

  //Comentarios by startup
  getComentariosByStartup(id: string): Observable<any> {
    return this.http.get(this.rootURL.concat('comentarios/startup/').concat(id));
  }

  //Comentarios by startup and usuario
  getComentariosByStartupAndUsuario(idStartup: string, idUsuario: string): Observable<any> {
    return this.http.get(this.rootURL.concat('comentarios/startupAndUsuario/').concat(idStartup).concat('/').concat(idUsuario));
  }

  //Guardar voto
  guardarVoto(voto: any): Observable<any> {
    console.warn(voto);
    return this.http.post(this.rootURL.concat('votos/'), voto);
  }
  //Guardar comentario
  guardarComentario(comentario: any): Observable<any> {
    return this.http.post(this.rootURL.concat('comentarios/'), comentario);
  }
}
