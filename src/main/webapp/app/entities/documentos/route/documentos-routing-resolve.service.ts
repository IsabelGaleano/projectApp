import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IDocumentos, Documentos } from '../documentos.model';
import { DocumentosService } from '../service/documentos.service';

@Injectable({ providedIn: 'root' })
export class DocumentosRoutingResolveService implements Resolve<IDocumentos> {
  constructor(protected service: DocumentosService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IDocumentos> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((documentos: HttpResponse<Documentos>) => {
          if (documentos.body) {
            return of(documentos.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Documentos());
  }
}
