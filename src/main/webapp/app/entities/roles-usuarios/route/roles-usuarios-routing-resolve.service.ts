import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IRolesUsuarios, RolesUsuarios } from '../roles-usuarios.model';
import { RolesUsuariosService } from '../service/roles-usuarios.service';

@Injectable({ providedIn: 'root' })
export class RolesUsuariosRoutingResolveService implements Resolve<IRolesUsuarios> {
  constructor(protected service: RolesUsuariosService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IRolesUsuarios> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((rolesUsuarios: HttpResponse<RolesUsuarios>) => {
          if (rolesUsuarios.body) {
            return of(rolesUsuarios.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new RolesUsuarios());
  }
}
