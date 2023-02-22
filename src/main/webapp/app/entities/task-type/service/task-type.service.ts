import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ITaskType, NewTaskType } from '../task-type.model';

export type PartialUpdateTaskType = Partial<ITaskType> & Pick<ITaskType, 'id'>;

type RestOf<T extends ITaskType | NewTaskType> = Omit<T, 'createdAt' | 'updatedAt'> & {
  createdAt?: string | null;
  updatedAt?: string | null;
};

export type RestTaskType = RestOf<ITaskType>;

export type NewRestTaskType = RestOf<NewTaskType>;

export type PartialUpdateRestTaskType = RestOf<PartialUpdateTaskType>;

export type EntityResponseType = HttpResponse<ITaskType>;
export type EntityArrayResponseType = HttpResponse<ITaskType[]>;

@Injectable({ providedIn: 'root' })
export class TaskTypeService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/task-types');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(taskType: NewTaskType): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(taskType);
    return this.http
      .post<RestTaskType>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(taskType: ITaskType): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(taskType);
    return this.http
      .put<RestTaskType>(`${this.resourceUrl}/${this.getTaskTypeIdentifier(taskType)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(taskType: PartialUpdateTaskType): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(taskType);
    return this.http
      .patch<RestTaskType>(`${this.resourceUrl}/${this.getTaskTypeIdentifier(taskType)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestTaskType>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestTaskType[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getTaskTypeIdentifier(taskType: Pick<ITaskType, 'id'>): number {
    return taskType.id;
  }

  compareTaskType(o1: Pick<ITaskType, 'id'> | null, o2: Pick<ITaskType, 'id'> | null): boolean {
    return o1 && o2 ? this.getTaskTypeIdentifier(o1) === this.getTaskTypeIdentifier(o2) : o1 === o2;
  }

  addTaskTypeToCollectionIfMissing<Type extends Pick<ITaskType, 'id'>>(
    taskTypeCollection: Type[],
    ...taskTypesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const taskTypes: Type[] = taskTypesToCheck.filter(isPresent);
    if (taskTypes.length > 0) {
      const taskTypeCollectionIdentifiers = taskTypeCollection.map(taskTypeItem => this.getTaskTypeIdentifier(taskTypeItem)!);
      const taskTypesToAdd = taskTypes.filter(taskTypeItem => {
        const taskTypeIdentifier = this.getTaskTypeIdentifier(taskTypeItem);
        if (taskTypeCollectionIdentifiers.includes(taskTypeIdentifier)) {
          return false;
        }
        taskTypeCollectionIdentifiers.push(taskTypeIdentifier);
        return true;
      });
      return [...taskTypesToAdd, ...taskTypeCollection];
    }
    return taskTypeCollection;
  }

  protected convertDateFromClient<T extends ITaskType | NewTaskType | PartialUpdateTaskType>(taskType: T): RestOf<T> {
    return {
      ...taskType,
      createdAt: taskType.createdAt?.toJSON() ?? null,
      updatedAt: taskType.updatedAt?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restTaskType: RestTaskType): ITaskType {
    return {
      ...restTaskType,
      createdAt: restTaskType.createdAt ? dayjs(restTaskType.createdAt) : undefined,
      updatedAt: restTaskType.updatedAt ? dayjs(restTaskType.updatedAt) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestTaskType>): HttpResponse<ITaskType> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestTaskType[]>): HttpResponse<ITaskType[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
