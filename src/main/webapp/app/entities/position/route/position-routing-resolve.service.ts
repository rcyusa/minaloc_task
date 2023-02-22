import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IPosition } from '../position.model';
import { PositionService } from '../service/position.service';

@Injectable({ providedIn: 'root' })
export class PositionRoutingResolveService implements Resolve<IPosition | null> {
  constructor(protected service: PositionService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPosition | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((position: HttpResponse<IPosition>) => {
          if (position.body) {
            return of(position.body);
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
