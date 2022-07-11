import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ICodigos, Codigos } from '../codigos.model';
import { CodigosService } from '../service/codigos.service';

@Injectable({ providedIn: 'root' })
export class CodigosRoutingResolveService implements Resolve<ICodigos> {
  constructor(protected service: CodigosService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICodigos> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((codigos: HttpResponse<Codigos>) => {
          if (codigos.body) {
            return of(codigos.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Codigos());
  }
}
