import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IMonederos, Monederos } from '../monederos.model';
import { MonederosService } from '../service/monederos.service';

@Injectable({ providedIn: 'root' })
export class MonederosRoutingResolveService implements Resolve<IMonederos> {
  constructor(protected service: MonederosService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IMonederos> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((monederos: HttpResponse<Monederos>) => {
          if (monederos.body) {
            return of(monederos.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Monederos());
  }
}
