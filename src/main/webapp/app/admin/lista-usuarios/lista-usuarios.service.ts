import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { ICodigos } from '../../entities/codigos/codigos.model';
import { EntityResponseType } from '../../entities/codigos/service/codigos.service';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  correo!: string;

  private _correo = new BehaviorSubject<string>((this.correo = ''));
  private _correo$ = this._correo.asObservable();

  constructor(private http: HttpClient) {}

  getCorreo(): Observable<string> {
    return this._correo$;
  }

  setCorreo(ultimoCorreo: string): void {
    return this._correo.next(ultimoCorreo);
  }

  getUsers(): Observable<any> {
    const ruta = '/api/usuarios';
    return this.http.get(ruta);
  }

  getUsersById(id: string): Observable<any> {
    let ruta = '/api/usuarios/';
    ruta = ruta.concat(id);

    return this.http.get(ruta);
  }

  addUser(user: any): any {
    const ruta = '/api/user';
    return this.http.post(ruta, { user });
  }

  updateUser(user: any, id: string): any {
    let ruta = '/api/usuarios/';
    ruta = ruta.concat(id);
    return this.http.put(ruta, user);
  }

  findByNombre(nombre: string): Observable<any> {
    let ruta = '/api/usuarios/findUsuariosByNombreOrApellido/';
    ruta = ruta + nombre;
    return this.http.get(ruta);
  }

  getUsuariosByCorreo(correoElectronico: string): Observable<any> {
    let ruta = '/api/usuariosByCorreo/';
    ruta = ruta.concat(correoElectronico);
    return this.http.get(ruta);
  }

  getUsersByEmail(correoElectronico: string): Observable<any> {
    let ruta = '/api/admin/usersEmail/';
    ruta = ruta.concat(correoElectronico);
    return this.http.get(ruta);
  }

  updateUserActivatedJHI(correo: string, activated: string): any {
    let ruta = '/api/admin/userActivated/';
    ruta = ruta.concat(correo);
    return this.http.put(ruta, activated);
  }

  updateUsuariosEstado(email: string, estado: string): any {
    let ruta = '/api/usuariosEstado/';
    ruta = ruta.concat(email);
    return this.http.put(ruta, estado);
  }
}
