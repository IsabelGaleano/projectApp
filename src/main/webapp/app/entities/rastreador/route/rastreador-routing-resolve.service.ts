import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IRastreador, Rastreador } from '../rastreador.model';
import { RastreadorService } from '../service/rastreador.service';

@Injectable({ providedIn: 'root' })
export class RastreadorRoutingResolveService implements Resolve<IRastreador> {
  constructor(protected service: RastreadorService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IRastreador> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((rastreador: HttpResponse<Rastreador>) => {
          if (rastreador.body) {
            return of(rastreador.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Rastreador());
  }
}
