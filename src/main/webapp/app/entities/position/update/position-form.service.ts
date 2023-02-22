import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IPosition, NewPosition } from '../position.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IPosition for edit and NewPositionFormGroupInput for create.
 */
type PositionFormGroupInput = IPosition | PartialWithRequiredKeyOf<NewPosition>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IPosition | NewPosition> = Omit<T, 'createdAt' | 'updatedAt'> & {
  createdAt?: string | null;
  updatedAt?: string | null;
};

type PositionFormRawValue = FormValueOf<IPosition>;

type NewPositionFormRawValue = FormValueOf<NewPosition>;

type PositionFormDefaults = Pick<NewPosition, 'id' | 'createdAt' | 'updatedAt' | 'tasks'>;

type PositionFormGroupContent = {
  id: FormControl<PositionFormRawValue['id'] | NewPosition['id']>;
  name: FormControl<PositionFormRawValue['name']>;
  description: FormControl<PositionFormRawValue['description']>;
  createdAt: FormControl<PositionFormRawValue['createdAt']>;
  updatedAt: FormControl<PositionFormRawValue['updatedAt']>;
  department: FormControl<PositionFormRawValue['department']>;
  tasks: FormControl<PositionFormRawValue['tasks']>;
};

export type PositionFormGroup = FormGroup<PositionFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class PositionFormService {
  createPositionFormGroup(position: PositionFormGroupInput = { id: null }): PositionFormGroup {
    const positionRawValue = this.convertPositionToPositionRawValue({
      ...this.getFormDefaults(),
      ...position,
    });
    return new FormGroup<PositionFormGroupContent>({
      id: new FormControl(
        { value: positionRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      name: new FormControl(positionRawValue.name, {
        validators: [Validators.required],
      }),
      description: new FormControl(positionRawValue.description, {
        validators: [Validators.required],
      }),
      createdAt: new FormControl(positionRawValue.createdAt, {
        validators: [Validators.required],
      }),
      updatedAt: new FormControl(positionRawValue.updatedAt, {
        validators: [Validators.required],
      }),
      department: new FormControl(positionRawValue.department),
      tasks: new FormControl(positionRawValue.tasks ?? []),
    });
  }

  getPosition(form: PositionFormGroup): IPosition | NewPosition {
    return this.convertPositionRawValueToPosition(form.getRawValue() as PositionFormRawValue | NewPositionFormRawValue);
  }

  resetForm(form: PositionFormGroup, position: PositionFormGroupInput): void {
    const positionRawValue = this.convertPositionToPositionRawValue({ ...this.getFormDefaults(), ...position });
    form.reset(
      {
        ...positionRawValue,
        id: { value: positionRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): PositionFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      createdAt: currentTime,
      updatedAt: currentTime,
      tasks: [],
    };
  }

  private convertPositionRawValueToPosition(rawPosition: PositionFormRawValue | NewPositionFormRawValue): IPosition | NewPosition {
    return {
      ...rawPosition,
      createdAt: dayjs(rawPosition.createdAt, DATE_TIME_FORMAT),
      updatedAt: dayjs(rawPosition.updatedAt, DATE_TIME_FORMAT),
    };
  }

  private convertPositionToPositionRawValue(
    position: IPosition | (Partial<NewPosition> & PositionFormDefaults)
  ): PositionFormRawValue | PartialWithRequiredKeyOf<NewPositionFormRawValue> {
    return {
      ...position,
      createdAt: position.createdAt ? position.createdAt.format(DATE_TIME_FORMAT) : undefined,
      updatedAt: position.updatedAt ? position.updatedAt.format(DATE_TIME_FORMAT) : undefined,
      tasks: position.tasks ?? [],
    };
  }
}
