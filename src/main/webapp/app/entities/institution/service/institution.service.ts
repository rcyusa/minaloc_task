import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IInstitution, NewInstitution } from '../institution.model';

export type PartialUpdateInstitution = Partial<IInstitution> & Pick<IInstitution, 'id'>;

type RestOf<T extends IInstitution | NewInstitution> = Omit<T, 'createdAt' | 'updatedAt'> & {
  createdAt?: string | null;
  updatedAt?: string | null;
};

export type RestInstitution = RestOf<IInstitution>;

export type NewRestInstitution = RestOf<NewInstitution>;

export type PartialUpdateRestInstitution = RestOf<PartialUpdateInstitution>;

export type EntityResponseType = HttpResponse<IInstitution>;
export type EntityArrayResponseType = HttpResponse<IInstitution[]>;

@Injectable({ providedIn: 'root' })
export class InstitutionService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/institutions');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(institution: NewInstitution): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(institution);
    return this.http
      .post<RestInstitution>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(institution: IInstitution): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(institution);
    return this.http
      .put<RestInstitution>(`${this.resourceUrl}/${this.getInstitutionIdentifier(institution)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(institution: PartialUpdateInstitution): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(institution);
    return this.http
      .patch<RestInstitution>(`${this.resourceUrl}/${this.getInstitutionIdentifier(institution)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestInstitution>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestInstitution[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getInstitutionIdentifier(institution: Pick<IInstitution, 'id'>): number {
    return institution.id;
  }

  compareInstitution(o1: Pick<IInstitution, 'id'> | null, o2: Pick<IInstitution, 'id'> | null): boolean {
    return o1 && o2 ? this.getInstitutionIdentifier(o1) === this.getInstitutionIdentifier(o2) : o1 === o2;
  }

  addInstitutionToCollectionIfMissing<Type extends Pick<IInstitution, 'id'>>(
    institutionCollection: Type[],
    ...institutionsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const institutions: Type[] = institutionsToCheck.filter(isPresent);
    if (institutions.length > 0) {
      const institutionCollectionIdentifiers = institutionCollection.map(
        institutionItem => this.getInstitutionIdentifier(institutionItem)!
      );
      const institutionsToAdd = institutions.filter(institutionItem => {
        const institutionIdentifier = this.getInstitutionIdentifier(institutionItem);
        if (institutionCollectionIdentifiers.includes(institutionIdentifier)) {
          return false;
        }
        institutionCollectionIdentifiers.push(institutionIdentifier);
        return true;
      });
      return [...institutionsToAdd, ...institutionCollection];
    }
    return institutionCollection;
  }

  protected convertDateFromClient<T extends IInstitution | NewInstitution | PartialUpdateInstitution>(institution: T): RestOf<T> {
    return {
      ...institution,
      createdAt: institution.createdAt?.toJSON() ?? null,
      updatedAt: institution.updatedAt?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restInstitution: RestInstitution): IInstitution {
    return {
      ...restInstitution,
      createdAt: restInstitution.createdAt ? dayjs(restInstitution.createdAt) : undefined,
      updatedAt: restInstitution.updatedAt ? dayjs(restInstitution.updatedAt) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestInstitution>): HttpResponse<IInstitution> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestInstitution[]>): HttpResponse<IInstitution[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
