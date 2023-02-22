import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { ITaskHistories, NewTaskHistories } from '../task-histories.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ITaskHistories for edit and NewTaskHistoriesFormGroupInput for create.
 */
type TaskHistoriesFormGroupInput = ITaskHistories | PartialWithRequiredKeyOf<NewTaskHistories>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends ITaskHistories | NewTaskHistories> = Omit<T, 'createdAt' | 'updatedAt'> & {
  createdAt?: string | null;
  updatedAt?: string | null;
};

type TaskHistoriesFormRawValue = FormValueOf<ITaskHistories>;

type NewTaskHistoriesFormRawValue = FormValueOf<NewTaskHistories>;

type TaskHistoriesFormDefaults = Pick<NewTaskHistories, 'id' | 'createdAt' | 'updatedAt'>;

type TaskHistoriesFormGroupContent = {
  id: FormControl<TaskHistoriesFormRawValue['id'] | NewTaskHistories['id']>;
  comment: FormControl<TaskHistoriesFormRawValue['comment']>;
  status: FormControl<TaskHistoriesFormRawValue['status']>;
  createdAt: FormControl<TaskHistoriesFormRawValue['createdAt']>;
  updatedAt: FormControl<TaskHistoriesFormRawValue['updatedAt']>;
  task: FormControl<TaskHistoriesFormRawValue['task']>;
};

export type TaskHistoriesFormGroup = FormGroup<TaskHistoriesFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class TaskHistoriesFormService {
  createTaskHistoriesFormGroup(taskHistories: TaskHistoriesFormGroupInput = { id: null }): TaskHistoriesFormGroup {
    const taskHistoriesRawValue = this.convertTaskHistoriesToTaskHistoriesRawValue({
      ...this.getFormDefaults(),
      ...taskHistories,
    });
    return new FormGroup<TaskHistoriesFormGroupContent>({
      id: new FormControl(
        { value: taskHistoriesRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      comment: new FormControl(taskHistoriesRawValue.comment, {
        validators: [Validators.required],
      }),
      status: new FormControl(taskHistoriesRawValue.status, {
        validators: [Validators.required],
      }),
      createdAt: new FormControl(taskHistoriesRawValue.createdAt, {
        validators: [Validators.required],
      }),
      updatedAt: new FormControl(taskHistoriesRawValue.updatedAt, {
        validators: [Validators.required],
      }),
      task: new FormControl(taskHistoriesRawValue.task),
    });
  }

  getTaskHistories(form: TaskHistoriesFormGroup): ITaskHistories | NewTaskHistories {
    return this.convertTaskHistoriesRawValueToTaskHistories(form.getRawValue() as TaskHistoriesFormRawValue | NewTaskHistoriesFormRawValue);
  }

  resetForm(form: TaskHistoriesFormGroup, taskHistories: TaskHistoriesFormGroupInput): void {
    const taskHistoriesRawValue = this.convertTaskHistoriesToTaskHistoriesRawValue({ ...this.getFormDefaults(), ...taskHistories });
    form.reset(
      {
        ...taskHistoriesRawValue,
        id: { value: taskHistoriesRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): TaskHistoriesFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      createdAt: currentTime,
      updatedAt: currentTime,
    };
  }

  private convertTaskHistoriesRawValueToTaskHistories(
    rawTaskHistories: TaskHistoriesFormRawValue | NewTaskHistoriesFormRawValue
  ): ITaskHistories | NewTaskHistories {
    return {
      ...rawTaskHistories,
      createdAt: dayjs(rawTaskHistories.createdAt, DATE_TIME_FORMAT),
      updatedAt: dayjs(rawTaskHistories.updatedAt, DATE_TIME_FORMAT),
    };
  }

  private convertTaskHistoriesToTaskHistoriesRawValue(
    taskHistories: ITaskHistories | (Partial<NewTaskHistories> & TaskHistoriesFormDefaults)
  ): TaskHistoriesFormRawValue | PartialWithRequiredKeyOf<NewTaskHistoriesFormRawValue> {
    return {
      ...taskHistories,
      createdAt: taskHistories.createdAt ? taskHistories.createdAt.format(DATE_TIME_FORMAT) : undefined,
      updatedAt: taskHistories.updatedAt ? taskHistories.updatedAt.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
