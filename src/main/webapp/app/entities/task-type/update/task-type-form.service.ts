import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { ITaskType, NewTaskType } from '../task-type.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ITaskType for edit and NewTaskTypeFormGroupInput for create.
 */
type TaskTypeFormGroupInput = ITaskType | PartialWithRequiredKeyOf<NewTaskType>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends ITaskType | NewTaskType> = Omit<T, 'createdAt' | 'updatedAt'> & {
  createdAt?: string | null;
  updatedAt?: string | null;
};

type TaskTypeFormRawValue = FormValueOf<ITaskType>;

type NewTaskTypeFormRawValue = FormValueOf<NewTaskType>;

type TaskTypeFormDefaults = Pick<NewTaskType, 'id' | 'createdAt' | 'updatedAt'>;

type TaskTypeFormGroupContent = {
  id: FormControl<TaskTypeFormRawValue['id'] | NewTaskType['id']>;
  title: FormControl<TaskTypeFormRawValue['title']>;
  description: FormControl<TaskTypeFormRawValue['description']>;
  createdAt: FormControl<TaskTypeFormRawValue['createdAt']>;
  updatedAt: FormControl<TaskTypeFormRawValue['updatedAt']>;
};

export type TaskTypeFormGroup = FormGroup<TaskTypeFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class TaskTypeFormService {
  createTaskTypeFormGroup(taskType: TaskTypeFormGroupInput = { id: null }): TaskTypeFormGroup {
    const taskTypeRawValue = this.convertTaskTypeToTaskTypeRawValue({
      ...this.getFormDefaults(),
      ...taskType,
    });
    return new FormGroup<TaskTypeFormGroupContent>({
      id: new FormControl(
        { value: taskTypeRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      title: new FormControl(taskTypeRawValue.title, {
        validators: [Validators.required],
      }),
      description: new FormControl(taskTypeRawValue.description, {
        validators: [Validators.required],
      }),
      createdAt: new FormControl(taskTypeRawValue.createdAt, {
        validators: [Validators.required],
      }),
      updatedAt: new FormControl(taskTypeRawValue.updatedAt, {
        validators: [Validators.required],
      }),
    });
  }

  getTaskType(form: TaskTypeFormGroup): ITaskType | NewTaskType {
    return this.convertTaskTypeRawValueToTaskType(form.getRawValue() as TaskTypeFormRawValue | NewTaskTypeFormRawValue);
  }

  resetForm(form: TaskTypeFormGroup, taskType: TaskTypeFormGroupInput): void {
    const taskTypeRawValue = this.convertTaskTypeToTaskTypeRawValue({ ...this.getFormDefaults(), ...taskType });
    form.reset(
      {
        ...taskTypeRawValue,
        id: { value: taskTypeRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): TaskTypeFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      createdAt: currentTime,
      updatedAt: currentTime,
    };
  }

  private convertTaskTypeRawValueToTaskType(rawTaskType: TaskTypeFormRawValue | NewTaskTypeFormRawValue): ITaskType | NewTaskType {
    return {
      ...rawTaskType,
      createdAt: dayjs(rawTaskType.createdAt, DATE_TIME_FORMAT),
      updatedAt: dayjs(rawTaskType.updatedAt, DATE_TIME_FORMAT),
    };
  }

  private convertTaskTypeToTaskTypeRawValue(
    taskType: ITaskType | (Partial<NewTaskType> & TaskTypeFormDefaults)
  ): TaskTypeFormRawValue | PartialWithRequiredKeyOf<NewTaskTypeFormRawValue> {
    return {
      ...taskType,
      createdAt: taskType.createdAt ? taskType.createdAt.format(DATE_TIME_FORMAT) : undefined,
      updatedAt: taskType.updatedAt ? taskType.updatedAt.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
