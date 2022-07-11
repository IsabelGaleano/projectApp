import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IReuniones, Reuniones } from '../reuniones.model';
import { ReunionesService } from '../service/reuniones.service';

@Injectable({ providedIn: 'root' })
export class ReunionesRoutingResolveService implements Resolve<IReuniones> {
  constructor(protected service: ReunionesService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IReuniones> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((reuniones: HttpResponse<Reuniones>) => {
          if (reuniones.body) {
            return of(reuniones.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Reuniones());
  }
}
