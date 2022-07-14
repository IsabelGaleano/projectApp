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
    return this.http.get(this.rootURL + '/usuarios');
  }

  getUsersById(id: string): Observable<any> {
    return this.http.get(this.rootURL + '/usuarios/' + id);
  }

  addUser(user: any): any {
    return this.http.post(this.rootURL + '/user', { user });
  }

  updateUser(user: any, id: string): any {
    return this.http.put(this.rootURL + '/usuarios/' + id, user);
  }
}
