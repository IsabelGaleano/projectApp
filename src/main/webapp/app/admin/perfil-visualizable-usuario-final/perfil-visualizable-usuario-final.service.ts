import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PerfilVisualizableUsuarioFinalService {
  constructor(private http: HttpClient) {}

  getMovimientosByIdMonedero(id: string): Observable<any> {
    let ruta = '/api/movimientosByIdUsuario/';
    ruta = ruta.concat(id);
    return this.http.get(ruta);
  }
}
