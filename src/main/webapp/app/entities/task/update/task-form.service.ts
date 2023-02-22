import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { ITask, NewTask } from '../task.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ITask for edit and NewTaskFormGroupInput for create.
 */
type TaskFormGroupInput = ITask | PartialWithRequiredKeyOf<NewTask>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends ITask | NewTask> = Omit<T, 'startDate' | 'endDate' | 'createdAt' | 'updatedAt'> & {
  startDate?: string | null;
  endDate?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
};

type TaskFormRawValue = FormValueOf<ITask>;

type NewTaskFormRawValue = FormValueOf<NewTask>;

type TaskFormDefaults = Pick<NewTask, 'id' | 'startDate' | 'endDate' | 'createdAt' | 'updatedAt' | 'institutions' | 'positions'>;

type TaskFormGroupContent = {
  id: FormControl<TaskFormRawValue['id'] | NewTask['id']>;
  title: FormControl<TaskFormRawValue['title']>;
  startDate: FormControl<TaskFormRawValue['startDate']>;
  endDate: FormControl<TaskFormRawValue['endDate']>;
  status: FormControl<TaskFormRawValue['status']>;
  priority: FormControl<TaskFormRawValue['priority']>;
  progress: FormControl<TaskFormRawValue['progress']>;
  description: FormControl<TaskFormRawValue['description']>;
  createdAt: FormControl<TaskFormRawValue['createdAt']>;
  updatedAt: FormControl<TaskFormRawValue['updatedAt']>;
  institutions: FormControl<TaskFormRawValue['institutions']>;
  positions: FormControl<TaskFormRawValue['positions']>;
  taskType: FormControl<TaskFormRawValue['taskType']>;
  nst1Sector: FormControl<TaskFormRawValue['nst1Sector']>;
};

export type TaskFormGroup = FormGroup<TaskFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class TaskFormService {
  createTaskFormGroup(task: TaskFormGroupInput = { id: null }): TaskFormGroup {
    const taskRawValue = this.convertTaskToTaskRawValue({
      ...this.getFormDefaults(),
      ...task,
    });
    return new FormGroup<TaskFormGroupContent>({
      id: new FormControl(
        { value: taskRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      title: new FormControl(taskRawValue.title, {
        validators: [Validators.required],
      }),
      startDate: new FormControl(taskRawValue.startDate, {
        validators: [Validators.required],
      }),
      endDate: new FormControl(taskRawValue.endDate, {
        validators: [Validators.required],
      }),
      status: new FormControl(taskRawValue.status, {
        validators: [Validators.required],
      }),
      priority: new FormControl(taskRawValue.priority, {
        validators: [Validators.required],
      }),
      progress: new FormControl(taskRawValue.progress, {
        validators: [Validators.required],
      }),
      description: new FormControl(taskRawValue.description, {
        validators: [Validators.required],
      }),
      createdAt: new FormControl(taskRawValue.createdAt, {
        validators: [Validators.required],
      }),
      updatedAt: new FormControl(taskRawValue.updatedAt, {
        validators: [Validators.required],
      }),
      institutions: new FormControl(taskRawValue.institutions ?? []),
      positions: new FormControl(taskRawValue.positions ?? []),
      taskType: new FormControl(taskRawValue.taskType),
      nst1Sector: new FormControl(taskRawValue.nst1Sector),
    });
  }

  getTask(form: TaskFormGroup): ITask | NewTask {
    return this.convertTaskRawValueToTask(form.getRawValue() as TaskFormRawValue | NewTaskFormRawValue);
  }

  resetForm(form: TaskFormGroup, task: TaskFormGroupInput): void {
    const taskRawValue = this.convertTaskToTaskRawValue({ ...this.getFormDefaults(), ...task });
    form.reset(
      {
        ...taskRawValue,
        id: { value: taskRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): TaskFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      startDate: currentTime,
      endDate: currentTime,
      createdAt: currentTime,
      updatedAt: currentTime,
      institutions: [],
      positions: [],
    };
  }

  private convertTaskRawValueToTask(rawTask: TaskFormRawValue | NewTaskFormRawValue): ITask | NewTask {
    return {
      ...rawTask,
      startDate: dayjs(rawTask.startDate, DATE_TIME_FORMAT),
      endDate: dayjs(rawTask.endDate, DATE_TIME_FORMAT),
      createdAt: dayjs(rawTask.createdAt, DATE_TIME_FORMAT),
      updatedAt: dayjs(rawTask.updatedAt, DATE_TIME_FORMAT),
    };
  }

  private convertTaskToTaskRawValue(
    task: ITask | (Partial<NewTask> & TaskFormDefaults)
  ): TaskFormRawValue | PartialWithRequiredKeyOf<NewTaskFormRawValue> {
    return {
      ...task,
      startDate: task.startDate ? task.startDate.format(DATE_TIME_FORMAT) : undefined,
      endDate: task.endDate ? task.endDate.format(DATE_TIME_FORMAT) : undefined,
      createdAt: task.createdAt ? task.createdAt.format(DATE_TIME_FORMAT) : undefined,
      updatedAt: task.updatedAt ? task.updatedAt.format(DATE_TIME_FORMAT) : undefined,
      institutions: task.institutions ?? [],
      positions: task.positions ?? [],
    };
  }
}
