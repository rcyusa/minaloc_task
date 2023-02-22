import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { TaskTypeComponent } from './list/task-type.component';
import { TaskTypeDetailComponent } from './detail/task-type-detail.component';
import { TaskTypeUpdateComponent } from './update/task-type-update.component';
import { TaskTypeDeleteDialogComponent } from './delete/task-type-delete-dialog.component';
import { TaskTypeRoutingModule } from './route/task-type-routing.module';

@NgModule({
  imports: [SharedModule, TaskTypeRoutingModule],
  declarations: [TaskTypeComponent, TaskTypeDetailComponent, TaskTypeUpdateComponent, TaskTypeDeleteDialogComponent],
})
export class TaskTypeModule {}
