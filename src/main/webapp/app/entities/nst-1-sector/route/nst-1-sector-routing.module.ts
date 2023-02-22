import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { Nst1SectorComponent } from '../list/nst-1-sector.component';
import { Nst1SectorDetailComponent } from '../detail/nst-1-sector-detail.component';
import { Nst1SectorUpdateComponent } from '../update/nst-1-sector-update.component';
import { Nst1SectorRoutingResolveService } from './nst-1-sector-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const nst1SectorRoute: Routes = [
  {
    path: '',
    component: Nst1SectorComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: Nst1SectorDetailComponent,
    resolve: {
      nst1Sector: Nst1SectorRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: Nst1SectorUpdateComponent,
    resolve: {
      nst1Sector: Nst1SectorRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: Nst1SectorUpdateComponent,
    resolve: {
      nst1Sector: Nst1SectorRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(nst1SectorRoute)],
  exports: [RouterModule],
})
export class Nst1SectorRoutingModule {}
