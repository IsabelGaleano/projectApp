import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IVotos, getVotosIdentifier } from '../votos.model';

export type EntityResponseType = HttpResponse<IVotos>;
export type EntityArrayResponseType = HttpResponse<IVotos[]>;

@Injectable({ providedIn: 'root' })
export class VotosService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/votos');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(votos: IVotos): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(votos);
    return this.http
      .post<IVotos>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(votos: IVotos): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(votos);
    return this.http
      .put<IVotos>(`${this.resourceUrl}/${getVotosIdentifier(votos) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(votos: IVotos): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(votos);
    return this.http
      .patch<IVotos>(`${this.resourceUrl}/${getVotosIdentifier(votos) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IVotos>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IVotos[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addVotosToCollectionIfMissing(votosCollection: IVotos[], ...votosToCheck: (IVotos | null | undefined)[]): IVotos[] {
    const votos: IVotos[] = votosToCheck.filter(isPresent);
    if (votos.length > 0) {
      const votosCollectionIdentifiers = votosCollection.map(votosItem => getVotosIdentifier(votosItem)!);
      const votosToAdd = votos.filter(votosItem => {
        const votosIdentifier = getVotosIdentifier(votosItem);
        if (votosIdentifier == null || votosCollectionIdentifiers.includes(votosIdentifier)) {
          return false;
        }
        votosCollectionIdentifiers.push(votosIdentifier);
        return true;
      });
      return [...votosToAdd, ...votosCollection];
    }
    return votosCollection;
  }

  protected convertDateFromClient(votos: IVotos): IVotos {
    return Object.assign({}, votos, {
      fecha: votos.fecha?.isValid() ? votos.fecha.toJSON() : undefined,
    });
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.fecha = res.body.fecha ? dayjs(res.body.fecha) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((votos: IVotos) => {
        votos.fecha = votos.fecha ? dayjs(votos.fecha) : undefined;
      });
    }
    return res;
  }
}
