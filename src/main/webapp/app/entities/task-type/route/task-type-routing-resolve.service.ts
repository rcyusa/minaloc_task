import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ITaskType } from '../task-type.model';
import { TaskTypeService } from '../service/task-type.service';

@Injectable({ providedIn: 'root' })
export class TaskTypeRoutingResolveService implements Resolve<ITaskType | null> {
  constructor(protected service: TaskTypeService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITaskType | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((taskType: HttpResponse<ITaskType>) => {
          if (taskType.body) {
            return of(taskType.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(null);
  }
}
