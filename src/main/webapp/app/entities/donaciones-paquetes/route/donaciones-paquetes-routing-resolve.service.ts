import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IDonacionesPaquetes, DonacionesPaquetes } from '../donaciones-paquetes.model';
import { DonacionesPaquetesService } from '../service/donaciones-paquetes.service';

@Injectable({ providedIn: 'root' })
export class DonacionesPaquetesRoutingResolveService implements Resolve<IDonacionesPaquetes> {
  constructor(protected service: DonacionesPaquetesService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IDonacionesPaquetes> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((donacionesPaquetes: HttpResponse<DonacionesPaquetes>) => {
          if (donacionesPaquetes.body) {
            return of(donacionesPaquetes.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new DonacionesPaquetes());
  }
}
