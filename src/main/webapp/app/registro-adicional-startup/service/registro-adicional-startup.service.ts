import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import {getStartupsIdentifier, IStartups} from "../../entities/startups/startups.model";

export type EntityResponseType = HttpResponse<IStartups>;
export type EntityArrayResponseType = HttpResponse<IStartups[]>;

@Injectable({ providedIn: 'root' })
export class StartupService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/startups');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  update(startup: IStartups): Observable<EntityResponseType> {
    return this.http.put<IStartups>(`${this.resourceUrl}/${getStartupsIdentifier(startup) as number}`, startup, { observe: 'response' });
  }
}
