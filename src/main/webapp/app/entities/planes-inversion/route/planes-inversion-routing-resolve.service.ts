import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IPlanesInversion, PlanesInversion } from '../planes-inversion.model';
import { PlanesInversionService } from '../service/planes-inversion.service';

@Injectable({ providedIn: 'root' })
export class PlanesInversionRoutingResolveService implements Resolve<IPlanesInversion> {
  constructor(protected service: PlanesInversionService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPlanesInversion> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((planesInversion: HttpResponse<PlanesInversion>) => {
          if (planesInversion.body) {
            return of(planesInversion.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new PlanesInversion());
  }
}
