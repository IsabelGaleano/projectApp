import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MenuStartupService {
  rootURL = '/api';
  constructor(private http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  getStartupLogin(correo: string | null): Observable<any> {
    if (correo !== null) {
      return this.http.get(this.rootURL.concat('/startups/findbyCorreo/').concat(correo));
    } else {
      return this.http.get(this.rootURL.concat('/startups/'));
    }
  }
}
