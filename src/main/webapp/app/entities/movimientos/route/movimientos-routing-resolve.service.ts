import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IMovimientos, Movimientos } from '../movimientos.model';
import { MovimientosService } from '../service/movimientos.service';

@Injectable({ providedIn: 'root' })
export class MovimientosRoutingResolveService implements Resolve<IMovimientos> {
  constructor(protected service: MovimientosService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IMovimientos> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((movimientos: HttpResponse<Movimientos>) => {
          if (movimientos.body) {
            return of(movimientos.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Movimientos());
  }
}
