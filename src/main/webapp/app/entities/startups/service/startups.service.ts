import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IStartups, getStartupsIdentifier } from '../startups.model';

export type EntityResponseType = HttpResponse<IStartups>;
export type EntityArrayResponseType = HttpResponse<IStartups[]>;

@Injectable({ providedIn: 'root' })
export class StartupsService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/startups');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(startups: IStartups): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(startups);
    return this.http
      .post<IStartups>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(startups: IStartups): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(startups);
    return this.http
      .put<IStartups>(`${this.resourceUrl}/${getStartupsIdentifier(startups) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(startups: IStartups): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(startups);
    return this.http
      .patch<IStartups>(`${this.resourceUrl}/${getStartupsIdentifier(startups) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IStartups>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IStartups[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addStartupsToCollectionIfMissing(startupsCollection: IStartups[], ...startupsToCheck: (IStartups | null | undefined)[]): IStartups[] {
    const startups: IStartups[] = startupsToCheck.filter(isPresent);
    if (startups.length > 0) {
      const startupsCollectionIdentifiers = startupsCollection.map(startupsItem => getStartupsIdentifier(startupsItem)!);
      const startupsToAdd = startups.filter(startupsItem => {
        const startupsIdentifier = getStartupsIdentifier(startupsItem);
        if (startupsIdentifier == null || startupsCollectionIdentifiers.includes(startupsIdentifier)) {
          return false;
        }
        startupsCollectionIdentifiers.push(startupsIdentifier);
        return true;
      });
      return [...startupsToAdd, ...startupsCollection];
    }
    return startupsCollection;
  }

  protected convertDateFromClient(startups: IStartups): IStartups {
    return Object.assign({}, startups, {
      fechaCreacion: startups.fechaCreacion?.isValid() ? startups.fechaCreacion.toJSON() : undefined,
    });
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.fechaCreacion = res.body.fechaCreacion ? dayjs(res.body.fechaCreacion) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((startups: IStartups) => {
        startups.fechaCreacion = startups.fechaCreacion ? dayjs(startups.fechaCreacion) : undefined;
      });
    }
    return res;
  }
}
