import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { TaskHistoriesComponent } from './list/task-histories.component';
import { TaskHistoriesDetailComponent } from './detail/task-histories-detail.component';
import { TaskHistoriesUpdateComponent } from './update/task-histories-update.component';
import { TaskHistoriesDeleteDialogComponent } from './delete/task-histories-delete-dialog.component';
import { TaskHistoriesRoutingModule } from './route/task-histories-routing.module';

@NgModule({
  imports: [SharedModule, TaskHistoriesRoutingModule],
  declarations: [TaskHistoriesComponent, TaskHistoriesDetailComponent, TaskHistoriesUpdateComponent, TaskHistoriesDeleteDialogComponent],
})
export class TaskHistoriesModule {}
