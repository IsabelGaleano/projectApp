import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IFacturas, Facturas } from '../facturas.model';
import { FacturasService } from '../service/facturas.service';

@Injectable({ providedIn: 'root' })
export class FacturasRoutingResolveService implements Resolve<IFacturas> {
  constructor(protected service: FacturasService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IFacturas> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((facturas: HttpResponse<Facturas>) => {
          if (facturas.body) {
            return of(facturas.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Facturas());
  }
}
