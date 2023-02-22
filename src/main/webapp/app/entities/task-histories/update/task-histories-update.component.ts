import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { TaskHistoriesFormService, TaskHistoriesFormGroup } from './task-histories-form.service';
import { ITaskHistories } from '../task-histories.model';
import { TaskHistoriesService } from '../service/task-histories.service';
import { ITask } from 'app/entities/task/task.model';
import { TaskService } from 'app/entities/task/service/task.service';
import { Status } from 'app/entities/enumerations/status.model';

@Component({
  selector: 'jhi-task-histories-update',
  templateUrl: './task-histories-update.component.html',
})
export class TaskHistoriesUpdateComponent implements OnInit {
  isSaving = false;
  taskHistories: ITaskHistories | null = null;
  statusValues = Object.keys(Status);

  tasksSharedCollection: ITask[] = [];

  editForm: TaskHistoriesFormGroup = this.taskHistoriesFormService.createTaskHistoriesFormGroup();

  constructor(
    protected taskHistoriesService: TaskHistoriesService,
    protected taskHistoriesFormService: TaskHistoriesFormService,
    protected taskService: TaskService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareTask = (o1: ITask | null, o2: ITask | null): boolean => this.taskService.compareTask(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ taskHistories }) => {
      this.taskHistories = taskHistories;
      if (taskHistories) {
        this.updateForm(taskHistories);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const taskHistories = this.taskHistoriesFormService.getTaskHistories(this.editForm);
    if (taskHistories.id !== null) {
      this.subscribeToSaveResponse(this.taskHistoriesService.update(taskHistories));
    } else {
      this.subscribeToSaveResponse(this.taskHistoriesService.create(taskHistories));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITaskHistories>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(taskHistories: ITaskHistories): void {
    this.taskHistories = taskHistories;
    this.taskHistoriesFormService.resetForm(this.editForm, taskHistories);

    this.tasksSharedCollection = this.taskService.addTaskToCollectionIfMissing<ITask>(this.tasksSharedCollection, taskHistories.task);
  }

  protected loadRelationshipsOptions(): void {
    this.taskService
      .query()
      .pipe(map((res: HttpResponse<ITask[]>) => res.body ?? []))
      .pipe(map((tasks: ITask[]) => this.taskService.addTaskToCollectionIfMissing<ITask>(tasks, this.taskHistories?.task)))
      .subscribe((tasks: ITask[]) => (this.tasksSharedCollection = tasks));
  }
}
