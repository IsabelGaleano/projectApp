import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StartupsPorCategoriaService {
  rootURL = '/api/';

  constructor(private http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  getStartupsPorCategoria(categoria: string | null): Observable<any> {
    if (categoria != null) {
      return this.http.get(this.rootURL.concat('startupsPorCategoria/').concat(categoria));
    }

    return this.http.get(this.rootURL.concat('startupsPorCategoria/Software'));
  }
}
