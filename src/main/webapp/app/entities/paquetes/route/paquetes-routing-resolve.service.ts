import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IPaquetes, Paquetes } from '../paquetes.model';
import { PaquetesService } from '../service/paquetes.service';

@Injectable({ providedIn: 'root' })
export class PaquetesRoutingResolveService implements Resolve<IPaquetes> {
  constructor(protected service: PaquetesService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPaquetes> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((paquetes: HttpResponse<Paquetes>) => {
          if (paquetes.body) {
            return of(paquetes.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Paquetes());
  }
}
