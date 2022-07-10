import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IVotos, Votos } from '../votos.model';
import { VotosService } from '../service/votos.service';

@Injectable({ providedIn: 'root' })
export class VotosRoutingResolveService implements Resolve<IVotos> {
  constructor(protected service: VotosService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IVotos> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((votos: HttpResponse<Votos>) => {
          if (votos.body) {
            return of(votos.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Votos());
  }
}
