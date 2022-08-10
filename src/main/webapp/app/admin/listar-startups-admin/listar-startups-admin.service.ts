import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IStartups } from '../../entities/startups/startups.model';

import { ApplicationConfigService } from 'app/core/config/application-config.service';

@Injectable({ providedIn: 'root' })
export class ListarStartupsAdminService {
  rootURL = '/api';

  constructor(private http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  ListarStartupsAdmin(): Observable<any> {
    /* eslint-disable no-console */
    console.log(this.http.get(this.rootURL.concat('/startups')));
    return this.http.get<IStartups>(this.applicationConfigService.getEndpointFor('api/startups'));
  }
  updateStartupsEstado(id: string, estado: string): any {
    let ruta = '/api/startups/estado/';
    ruta = ruta.concat(id);
    return this.http.put(ruta, estado);
  }

  findByNombre(nombre: string):  Observable<any> {
    let ruta = '/api/startups/findStartupsByNombreOrCorreo/';
    ruta = ruta + nombre;
    return this.http.get(ruta);
  }
}
