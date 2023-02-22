import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ITaskHistories } from '../task-histories.model';
import { TaskHistoriesService } from '../service/task-histories.service';

@Injectable({ providedIn: 'root' })
export class TaskHistoriesRoutingResolveService implements Resolve<ITaskHistories | null> {
  constructor(protected service: TaskHistoriesService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITaskHistories | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((taskHistories: HttpResponse<ITaskHistories>) => {
          if (taskHistories.body) {
            return of(taskHistories.body);
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
