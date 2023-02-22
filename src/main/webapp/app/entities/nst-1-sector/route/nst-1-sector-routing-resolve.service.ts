import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { INst1Sector } from '../nst-1-sector.model';
import { Nst1SectorService } from '../service/nst-1-sector.service';

@Injectable({ providedIn: 'root' })
export class Nst1SectorRoutingResolveService implements Resolve<INst1Sector | null> {
  constructor(protected service: Nst1SectorService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<INst1Sector | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((nst1Sector: HttpResponse<INst1Sector>) => {
          if (nst1Sector.body) {
            return of(nst1Sector.body);
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
