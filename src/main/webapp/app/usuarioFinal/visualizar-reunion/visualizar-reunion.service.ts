import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class VisualizarReunionService {
  rootURL = '/api/';

  constructor(private http: HttpClient) {}

  //Obtener reunion por id
  obtenerReunion(idReunion: string): Observable<any> {
    return this.http.get(this.rootURL.concat('reuniones/').concat(idReunion));
  }
}
