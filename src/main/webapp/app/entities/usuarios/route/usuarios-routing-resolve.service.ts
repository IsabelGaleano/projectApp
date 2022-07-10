import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IUsuarios, Usuarios } from '../usuarios.model';
import { UsuariosService } from '../service/usuarios.service';

@Injectable({ providedIn: 'root' })
export class UsuariosRoutingResolveService implements Resolve<IUsuarios> {
  constructor(protected service: UsuariosService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IUsuarios> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((usuarios: HttpResponse<Usuarios>) => {
          if (usuarios.body) {
            return of(usuarios.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Usuarios());
  }
}
