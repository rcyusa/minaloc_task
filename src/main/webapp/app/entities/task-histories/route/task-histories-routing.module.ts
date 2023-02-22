import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { TaskHistoriesComponent } from '../list/task-histories.component';
import { TaskHistoriesDetailComponent } from '../detail/task-histories-detail.component';
import { TaskHistoriesUpdateComponent } from '../update/task-histories-update.component';
import { TaskHistoriesRoutingResolveService } from './task-histories-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const taskHistoriesRoute: Routes = [
  {
    path: '',
    component: TaskHistoriesComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: TaskHistoriesDetailComponent,
    resolve: {
      taskHistories: TaskHistoriesRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: TaskHistoriesUpdateComponent,
    resolve: {
      taskHistories: TaskHistoriesRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: TaskHistoriesUpdateComponent,
    resolve: {
      taskHistories: TaskHistoriesRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(taskHistoriesRoute)],
  exports: [RouterModule],
})
export class TaskHistoriesRoutingModule {}
