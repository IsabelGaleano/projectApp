import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IMensajes, Mensajes } from '../mensajes.model';
import { MensajesService } from '../service/mensajes.service';

@Injectable({ providedIn: 'root' })
export class MensajesRoutingResolveService implements Resolve<IMensajes> {
  constructor(protected service: MensajesService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IMensajes> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((mensajes: HttpResponse<Mensajes>) => {
          if (mensajes.body) {
            return of(mensajes.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Mensajes());
  }
}
