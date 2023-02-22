import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IDepartment, NewDepartment } from '../department.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IDepartment for edit and NewDepartmentFormGroupInput for create.
 */
type DepartmentFormGroupInput = IDepartment | PartialWithRequiredKeyOf<NewDepartment>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IDepartment | NewDepartment> = Omit<T, 'createdAt' | 'updatedAt'> & {
  createdAt?: string | null;
  updatedAt?: string | null;
};

type DepartmentFormRawValue = FormValueOf<IDepartment>;

type NewDepartmentFormRawValue = FormValueOf<NewDepartment>;

type DepartmentFormDefaults = Pick<NewDepartment, 'id' | 'createdAt' | 'updatedAt'>;

type DepartmentFormGroupContent = {
  id: FormControl<DepartmentFormRawValue['id'] | NewDepartment['id']>;
  name: FormControl<DepartmentFormRawValue['name']>;
  createdAt: FormControl<DepartmentFormRawValue['createdAt']>;
  updatedAt: FormControl<DepartmentFormRawValue['updatedAt']>;
};

export type DepartmentFormGroup = FormGroup<DepartmentFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class DepartmentFormService {
  createDepartmentFormGroup(department: DepartmentFormGroupInput = { id: null }): DepartmentFormGroup {
    const departmentRawValue = this.convertDepartmentToDepartmentRawValue({
      ...this.getFormDefaults(),
      ...department,
    });
    return new FormGroup<DepartmentFormGroupContent>({
      id: new FormControl(
        { value: departmentRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      name: new FormControl(departmentRawValue.name, {
        validators: [Validators.required],
      }),
      createdAt: new FormControl(departmentRawValue.createdAt, {
        validators: [Validators.required],
      }),
      updatedAt: new FormControl(departmentRawValue.updatedAt, {
        validators: [Validators.required],
      }),
    });
  }

  getDepartment(form: DepartmentFormGroup): IDepartment | NewDepartment {
    return this.convertDepartmentRawValueToDepartment(form.getRawValue() as DepartmentFormRawValue | NewDepartmentFormRawValue);
  }

  resetForm(form: DepartmentFormGroup, department: DepartmentFormGroupInput): void {
    const departmentRawValue = this.convertDepartmentToDepartmentRawValue({ ...this.getFormDefaults(), ...department });
    form.reset(
      {
        ...departmentRawValue,
        id: { value: departmentRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): DepartmentFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      createdAt: currentTime,
      updatedAt: currentTime,
    };
  }

  private convertDepartmentRawValueToDepartment(
    rawDepartment: DepartmentFormRawValue | NewDepartmentFormRawValue
  ): IDepartment | NewDepartment {
    return {
      ...rawDepartment,
      createdAt: dayjs(rawDepartment.createdAt, DATE_TIME_FORMAT),
      updatedAt: dayjs(rawDepartment.updatedAt, DATE_TIME_FORMAT),
    };
  }

  private convertDepartmentToDepartmentRawValue(
    department: IDepartment | (Partial<NewDepartment> & DepartmentFormDefaults)
  ): DepartmentFormRawValue | PartialWithRequiredKeyOf<NewDepartmentFormRawValue> {
    return {
      ...department,
      createdAt: department.createdAt ? department.createdAt.format(DATE_TIME_FORMAT) : undefined,
      updatedAt: department.updatedAt ? department.updatedAt.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
