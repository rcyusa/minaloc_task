import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ITaskHistories, NewTaskHistories } from '../task-histories.model';

export type PartialUpdateTaskHistories = Partial<ITaskHistories> & Pick<ITaskHistories, 'id'>;

type RestOf<T extends ITaskHistories | NewTaskHistories> = Omit<T, 'createdAt' | 'updatedAt'> & {
  createdAt?: string | null;
  updatedAt?: string | null;
};

export type RestTaskHistories = RestOf<ITaskHistories>;

export type NewRestTaskHistories = RestOf<NewTaskHistories>;

export type PartialUpdateRestTaskHistories = RestOf<PartialUpdateTaskHistories>;

export type EntityResponseType = HttpResponse<ITaskHistories>;
export type EntityArrayResponseType = HttpResponse<ITaskHistories[]>;

@Injectable({ providedIn: 'root' })
export class TaskHistoriesService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/task-histories');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(taskHistories: NewTaskHistories): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(taskHistories);
    return this.http
      .post<RestTaskHistories>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(taskHistories: ITaskHistories): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(taskHistories);
    return this.http
      .put<RestTaskHistories>(`${this.resourceUrl}/${this.getTaskHistoriesIdentifier(taskHistories)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(taskHistories: PartialUpdateTaskHistories): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(taskHistories);
    return this.http
      .patch<RestTaskHistories>(`${this.resourceUrl}/${this.getTaskHistoriesIdentifier(taskHistories)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestTaskHistories>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestTaskHistories[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getTaskHistoriesIdentifier(taskHistories: Pick<ITaskHistories, 'id'>): number {
    return taskHistories.id;
  }

  compareTaskHistories(o1: Pick<ITaskHistories, 'id'> | null, o2: Pick<ITaskHistories, 'id'> | null): boolean {
    return o1 && o2 ? this.getTaskHistoriesIdentifier(o1) === this.getTaskHistoriesIdentifier(o2) : o1 === o2;
  }

  addTaskHistoriesToCollectionIfMissing<Type extends Pick<ITaskHistories, 'id'>>(
    taskHistoriesCollection: Type[],
    ...taskHistoriesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const taskHistories: Type[] = taskHistoriesToCheck.filter(isPresent);
    if (taskHistories.length > 0) {
      const taskHistoriesCollectionIdentifiers = taskHistoriesCollection.map(
        taskHistoriesItem => this.getTaskHistoriesIdentifier(taskHistoriesItem)!
      );
      const taskHistoriesToAdd = taskHistories.filter(taskHistoriesItem => {
        const taskHistoriesIdentifier = this.getTaskHistoriesIdentifier(taskHistoriesItem);
        if (taskHistoriesCollectionIdentifiers.includes(taskHistoriesIdentifier)) {
          return false;
        }
        taskHistoriesCollectionIdentifiers.push(taskHistoriesIdentifier);
        return true;
      });
      return [...taskHistoriesToAdd, ...taskHistoriesCollection];
    }
    return taskHistoriesCollection;
  }

  protected convertDateFromClient<T extends ITaskHistories | NewTaskHistories | PartialUpdateTaskHistories>(taskHistories: T): RestOf<T> {
    return {
      ...taskHistories,
      createdAt: taskHistories.createdAt?.toJSON() ?? null,
      updatedAt: taskHistories.updatedAt?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restTaskHistories: RestTaskHistories): ITaskHistories {
    return {
      ...restTaskHistories,
      createdAt: restTaskHistories.createdAt ? dayjs(restTaskHistories.createdAt) : undefined,
      updatedAt: restTaskHistories.updatedAt ? dayjs(restTaskHistories.updatedAt) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestTaskHistories>): HttpResponse<ITaskHistories> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestTaskHistories[]>): HttpResponse<ITaskHistories[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
