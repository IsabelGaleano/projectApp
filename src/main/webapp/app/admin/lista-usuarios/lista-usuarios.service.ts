import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  rootURL = '/api';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any> {
    const ruta = '/api/usuarios';
    return this.http.get(ruta);
  }

  getUsersById(id: string): Observable<any> {
    const ruta = '/api/usuarios/' + id;
    return this.http.get(ruta);
  }

  addUser(user: any): any {
    const ruta = '/api/user';
    return this.http.post(ruta, { user });
  }

  updateUser(user: any, id: string): any {
    const ruta = '/api/usuarios/' + id;
    return this.http.put(ruta, user);
  }
}
