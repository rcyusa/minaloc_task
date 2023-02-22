import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { TaskTypeComponent } from '../list/task-type.component';
import { TaskTypeDetailComponent } from '../detail/task-type-detail.component';
import { TaskTypeUpdateComponent } from '../update/task-type-update.component';
import { TaskTypeRoutingResolveService } from './task-type-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const taskTypeRoute: Routes = [
  {
    path: '',
    component: TaskTypeComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: TaskTypeDetailComponent,
    resolve: {
      taskType: TaskTypeRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: TaskTypeUpdateComponent,
    resolve: {
      taskType: TaskTypeRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: TaskTypeUpdateComponent,
    resolve: {
      taskType: TaskTypeRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(taskTypeRoute)],
  exports: [RouterModule],
})
export class TaskTypeRoutingModule {}
