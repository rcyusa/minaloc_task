import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { TaskTypeFormService, TaskTypeFormGroup } from './task-type-form.service';
import { ITaskType } from '../task-type.model';
import { TaskTypeService } from '../service/task-type.service';

@Component({
  selector: 'jhi-task-type-update',
  templateUrl: './task-type-update.component.html',
})
export class TaskTypeUpdateComponent implements OnInit {
  isSaving = false;
  taskType: ITaskType | null = null;

  editForm: TaskTypeFormGroup = this.taskTypeFormService.createTaskTypeFormGroup();

  constructor(
    protected taskTypeService: TaskTypeService,
    protected taskTypeFormService: TaskTypeFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ taskType }) => {
      this.taskType = taskType;
      if (taskType) {
        this.updateForm(taskType);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const taskType = this.taskTypeFormService.getTaskType(this.editForm);
    if (taskType.id !== null) {
      this.subscribeToSaveResponse(this.taskTypeService.update(taskType));
    } else {
      this.subscribeToSaveResponse(this.taskTypeService.create(taskType));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITaskType>>): void {
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

  protected updateForm(taskType: ITaskType): void {
    this.taskType = taskType;
    this.taskTypeFormService.resetForm(this.editForm, taskType);
  }
}
