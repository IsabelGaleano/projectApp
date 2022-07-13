import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ICategorias, Categorias } from '../categorias.model';
import { CategoriasService } from '../service/categorias.service';

@Injectable({ providedIn: 'root' })
export class CategoriasRoutingResolveService implements Resolve<ICategorias> {
  constructor(protected service: CategoriasService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICategorias> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((categorias: HttpResponse<Categorias>) => {
          if (categorias.body) {
            return of(categorias.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Categorias());
  }
}
