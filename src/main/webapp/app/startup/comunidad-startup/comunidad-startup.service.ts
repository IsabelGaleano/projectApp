import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { Startups } from 'app/entities/startups/startups.model';

@Injectable({
  providedIn: 'root',
})
export class ComunidadStartupService {
  rootURL = '/api/';

  constructor(private http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  // getMovimientosByIdMonedero(id: string): Observable<any> {
  //   let ruta = '/api/movimientosByIdUsuario/';
  //   ruta = ruta.concat(id);
  //   return this.http.get(ruta);
  // }

  // save(currentPassword: string, newPassword: string): Observable<{}> {
  //   return this.http.post(this.applicationConfigService.getEndpointFor('api/account/change-password'), { currentPassword, newPassword });
  // }

  getAllStartups(): Observable<any> {
    return this.http.get(this.rootURL.concat('startupsCategoria'));
  }

  getCantidadCategoria(categoria: string): Observable<any> {
    return this.http.get(this.rootURL.concat('cantidadCategoria/').concat(categoria));
  }

  getVotosPorStartup(startup: Startups): Observable<any> {
    return this.http.post(this.rootURL.concat('votosStartup'), startup);
  }
}
