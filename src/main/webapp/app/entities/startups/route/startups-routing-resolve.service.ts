import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IStartups, Startups } from '../startups.model';
import { StartupsService } from '../service/startups.service';

@Injectable({ providedIn: 'root' })
export class StartupsRoutingResolveService implements Resolve<IStartups> {
  constructor(protected service: StartupsService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IStartups> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((startups: HttpResponse<Startups>) => {
          if (startups.body) {
            return of(startups.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Startups());
  }
}
