import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { INst1Sector, NewNst1Sector } from '../nst-1-sector.model';

export type PartialUpdateNst1Sector = Partial<INst1Sector> & Pick<INst1Sector, 'id'>;

type RestOf<T extends INst1Sector | NewNst1Sector> = Omit<T, 'createdAt' | 'updatedAt'> & {
  createdAt?: string | null;
  updatedAt?: string | null;
};

export type RestNst1Sector = RestOf<INst1Sector>;

export type NewRestNst1Sector = RestOf<NewNst1Sector>;

export type PartialUpdateRestNst1Sector = RestOf<PartialUpdateNst1Sector>;

export type EntityResponseType = HttpResponse<INst1Sector>;
export type EntityArrayResponseType = HttpResponse<INst1Sector[]>;

@Injectable({ providedIn: 'root' })
export class Nst1SectorService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/nst-1-sectors');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(nst1Sector: NewNst1Sector): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(nst1Sector);
    return this.http
      .post<RestNst1Sector>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(nst1Sector: INst1Sector): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(nst1Sector);
    return this.http
      .put<RestNst1Sector>(`${this.resourceUrl}/${this.getNst1SectorIdentifier(nst1Sector)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(nst1Sector: PartialUpdateNst1Sector): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(nst1Sector);
    return this.http
      .patch<RestNst1Sector>(`${this.resourceUrl}/${this.getNst1SectorIdentifier(nst1Sector)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestNst1Sector>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestNst1Sector[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getNst1SectorIdentifier(nst1Sector: Pick<INst1Sector, 'id'>): number {
    return nst1Sector.id;
  }

  compareNst1Sector(o1: Pick<INst1Sector, 'id'> | null, o2: Pick<INst1Sector, 'id'> | null): boolean {
    return o1 && o2 ? this.getNst1SectorIdentifier(o1) === this.getNst1SectorIdentifier(o2) : o1 === o2;
  }

  addNst1SectorToCollectionIfMissing<Type extends Pick<INst1Sector, 'id'>>(
    nst1SectorCollection: Type[],
    ...nst1SectorsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const nst1Sectors: Type[] = nst1SectorsToCheck.filter(isPresent);
    if (nst1Sectors.length > 0) {
      const nst1SectorCollectionIdentifiers = nst1SectorCollection.map(nst1SectorItem => this.getNst1SectorIdentifier(nst1SectorItem)!);
      const nst1SectorsToAdd = nst1Sectors.filter(nst1SectorItem => {
        const nst1SectorIdentifier = this.getNst1SectorIdentifier(nst1SectorItem);
        if (nst1SectorCollectionIdentifiers.includes(nst1SectorIdentifier)) {
          return false;
        }
        nst1SectorCollectionIdentifiers.push(nst1SectorIdentifier);
        return true;
      });
      return [...nst1SectorsToAdd, ...nst1SectorCollection];
    }
    return nst1SectorCollection;
  }

  protected convertDateFromClient<T extends INst1Sector | NewNst1Sector | PartialUpdateNst1Sector>(nst1Sector: T): RestOf<T> {
    return {
      ...nst1Sector,
      createdAt: nst1Sector.createdAt?.toJSON() ?? null,
      updatedAt: nst1Sector.updatedAt?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restNst1Sector: RestNst1Sector): INst1Sector {
    return {
      ...restNst1Sector,
      createdAt: restNst1Sector.createdAt ? dayjs(restNst1Sector.createdAt) : undefined,
      updatedAt: restNst1Sector.updatedAt ? dayjs(restNst1Sector.updatedAt) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestNst1Sector>): HttpResponse<INst1Sector> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestNst1Sector[]>): HttpResponse<INst1Sector[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
