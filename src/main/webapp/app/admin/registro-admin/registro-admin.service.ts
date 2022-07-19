import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { RegistroAdmin } from './registro-admin.model';

const baseUrl = 'http://localhost:8080/api/';

@Injectable({
  providedIn: 'root',
})
export class RegistroAdminService {
  constructor(private http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  // save(registration: Registro): Observable<{}> {
  //   return this.http.post(this.applicationConfigService.getEndpointFor('api/registerUserAdmin'), registration);
  // }

  save(registration: RegistroAdmin): Observable<{}> {
    return this.http.post(this.applicationConfigService.getEndpointFor('api/registerUserAdmin'), registration);
  }

  // saveFinalUser(registro: RegistroAdmin): Observable<{}> {
  //   return this.http.post(baseUrl, registro);
  // }

  // registrarAdmin(admin: RegistroAdmin):Observable<any>{
  //   return this.http.post(baseUrl.concat("usuarios"), admin);
  // }

  // crearMonedero(monedero: Monedero):Observable<any>{
  //   return this.http.post(baseUrl.concat("monederos"), monedero);
  // }

  // registrarAdminJHI(jhiUser:any):Observable<any>{
  //   return this.http.post(baseUrl.concat("admin/"), jhiUser);
  // }
}
