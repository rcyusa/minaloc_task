import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { TaskFormService, TaskFormGroup } from './task-form.service';
import { ITask } from '../task.model';
import { TaskService } from '../service/task.service';
import { IInstitution } from 'app/entities/institution/institution.model';
import { InstitutionService } from 'app/entities/institution/service/institution.service';
import { IPosition } from 'app/entities/position/position.model';
import { PositionService } from 'app/entities/position/service/position.service';
import { ITaskType } from 'app/entities/task-type/task-type.model';
import { TaskTypeService } from 'app/entities/task-type/service/task-type.service';
import { INst1Sector } from 'app/entities/nst-1-sector/nst-1-sector.model';
import { Nst1SectorService } from 'app/entities/nst-1-sector/service/nst-1-sector.service';
import { Status } from 'app/entities/enumerations/status.model';
import { Priority } from 'app/entities/enumerations/priority.model';
import { Progress } from 'app/entities/enumerations/progress.model';

@Component({
  selector: 'jhi-task-update',
  templateUrl: './task-update.component.html',
})
export class TaskUpdateComponent implements OnInit {
  isSaving = false;
  task: ITask | null = null;
  statusValues = Object.keys(Status);
  priorityValues = Object.keys(Priority);
  progressValues = Object.keys(Progress);

  institutionsSharedCollection: IInstitution[] = [];
  positionsSharedCollection: IPosition[] = [];
  taskTypesSharedCollection: ITaskType[] = [];
  nst1SectorsSharedCollection: INst1Sector[] = [];

  editForm: TaskFormGroup = this.taskFormService.createTaskFormGroup();

  constructor(
    protected taskService: TaskService,
    protected taskFormService: TaskFormService,
    protected institutionService: InstitutionService,
    protected positionService: PositionService,
    protected taskTypeService: TaskTypeService,
    protected nst1SectorService: Nst1SectorService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareInstitution = (o1: IInstitution | null, o2: IInstitution | null): boolean => this.institutionService.compareInstitution(o1, o2);

  comparePosition = (o1: IPosition | null, o2: IPosition | null): boolean => this.positionService.comparePosition(o1, o2);

  compareTaskType = (o1: ITaskType | null, o2: ITaskType | null): boolean => this.taskTypeService.compareTaskType(o1, o2);

  compareNst1Sector = (o1: INst1Sector | null, o2: INst1Sector | null): boolean => this.nst1SectorService.compareNst1Sector(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ task }) => {
      this.task = task;
      if (task) {
        this.updateForm(task);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const task = this.taskFormService.getTask(this.editForm);
    if (task.id !== null) {
      this.subscribeToSaveResponse(this.taskService.update(task));
    } else {
      this.subscribeToSaveResponse(this.taskService.create(task));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITask>>): void {
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

  protected updateForm(task: ITask): void {
    this.task = task;
    this.taskFormService.resetForm(this.editForm, task);

    this.institutionsSharedCollection = this.institutionService.addInstitutionToCollectionIfMissing<IInstitution>(
      this.institutionsSharedCollection,
      ...(task.institutions ?? [])
    );
    this.positionsSharedCollection = this.positionService.addPositionToCollectionIfMissing<IPosition>(
      this.positionsSharedCollection,
      ...(task.positions ?? [])
    );
    this.taskTypesSharedCollection = this.taskTypeService.addTaskTypeToCollectionIfMissing<ITaskType>(
      this.taskTypesSharedCollection,
      task.taskType
    );
    this.nst1SectorsSharedCollection = this.nst1SectorService.addNst1SectorToCollectionIfMissing<INst1Sector>(
      this.nst1SectorsSharedCollection,
      task.nst1Sector
    );
  }

  protected loadRelationshipsOptions(): void {
    this.institutionService
      .query()
      .pipe(map((res: HttpResponse<IInstitution[]>) => res.body ?? []))
      .pipe(
        map((institutions: IInstitution[]) =>
          this.institutionService.addInstitutionToCollectionIfMissing<IInstitution>(institutions, ...(this.task?.institutions ?? []))
        )
      )
      .subscribe((institutions: IInstitution[]) => (this.institutionsSharedCollection = institutions));

    this.positionService
      .query()
      .pipe(map((res: HttpResponse<IPosition[]>) => res.body ?? []))
      .pipe(
        map((positions: IPosition[]) =>
          this.positionService.addPositionToCollectionIfMissing<IPosition>(positions, ...(this.task?.positions ?? []))
        )
      )
      .subscribe((positions: IPosition[]) => (this.positionsSharedCollection = positions));

    this.taskTypeService
      .query()
      .pipe(map((res: HttpResponse<ITaskType[]>) => res.body ?? []))
      .pipe(
        map((taskTypes: ITaskType[]) => this.taskTypeService.addTaskTypeToCollectionIfMissing<ITaskType>(taskTypes, this.task?.taskType))
      )
      .subscribe((taskTypes: ITaskType[]) => (this.taskTypesSharedCollection = taskTypes));

    this.nst1SectorService
      .query()
      .pipe(map((res: HttpResponse<INst1Sector[]>) => res.body ?? []))
      .pipe(
        map((nst1Sectors: INst1Sector[]) =>
          this.nst1SectorService.addNst1SectorToCollectionIfMissing<INst1Sector>(nst1Sectors, this.task?.nst1Sector)
        )
      )
      .subscribe((nst1Sectors: INst1Sector[]) => (this.nst1SectorsSharedCollection = nst1Sectors));
  }
}
