import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IInstitution, NewInstitution } from '../institution.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IInstitution for edit and NewInstitutionFormGroupInput for create.
 */
type InstitutionFormGroupInput = IInstitution | PartialWithRequiredKeyOf<NewInstitution>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IInstitution | NewInstitution> = Omit<T, 'createdAt' | 'updatedAt'> & {
  createdAt?: string | null;
  updatedAt?: string | null;
};

type InstitutionFormRawValue = FormValueOf<IInstitution>;

type NewInstitutionFormRawValue = FormValueOf<NewInstitution>;

type InstitutionFormDefaults = Pick<NewInstitution, 'id' | 'createdAt' | 'updatedAt' | 'tasks'>;

type InstitutionFormGroupContent = {
  id: FormControl<InstitutionFormRawValue['id'] | NewInstitution['id']>;
  name: FormControl<InstitutionFormRawValue['name']>;
  description: FormControl<InstitutionFormRawValue['description']>;
  createdAt: FormControl<InstitutionFormRawValue['createdAt']>;
  updatedAt: FormControl<InstitutionFormRawValue['updatedAt']>;
  tasks: FormControl<InstitutionFormRawValue['tasks']>;
};

export type InstitutionFormGroup = FormGroup<InstitutionFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class InstitutionFormService {
  createInstitutionFormGroup(institution: InstitutionFormGroupInput = { id: null }): InstitutionFormGroup {
    const institutionRawValue = this.convertInstitutionToInstitutionRawValue({
      ...this.getFormDefaults(),
      ...institution,
    });
    return new FormGroup<InstitutionFormGroupContent>({
      id: new FormControl(
        { value: institutionRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      name: new FormControl(institutionRawValue.name, {
        validators: [Validators.required],
      }),
      description: new FormControl(institutionRawValue.description, {
        validators: [Validators.required],
      }),
      createdAt: new FormControl(institutionRawValue.createdAt, {
        validators: [Validators.required],
      }),
      updatedAt: new FormControl(institutionRawValue.updatedAt, {
        validators: [Validators.required],
      }),
      tasks: new FormControl(institutionRawValue.tasks ?? []),
    });
  }

  getInstitution(form: InstitutionFormGroup): IInstitution | NewInstitution {
    return this.convertInstitutionRawValueToInstitution(form.getRawValue() as InstitutionFormRawValue | NewInstitutionFormRawValue);
  }

  resetForm(form: InstitutionFormGroup, institution: InstitutionFormGroupInput): void {
    const institutionRawValue = this.convertInstitutionToInstitutionRawValue({ ...this.getFormDefaults(), ...institution });
    form.reset(
      {
        ...institutionRawValue,
        id: { value: institutionRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): InstitutionFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      createdAt: currentTime,
      updatedAt: currentTime,
      tasks: [],
    };
  }

  private convertInstitutionRawValueToInstitution(
    rawInstitution: InstitutionFormRawValue | NewInstitutionFormRawValue
  ): IInstitution | NewInstitution {
    return {
      ...rawInstitution,
      createdAt: dayjs(rawInstitution.createdAt, DATE_TIME_FORMAT),
      updatedAt: dayjs(rawInstitution.updatedAt, DATE_TIME_FORMAT),
    };
  }

  private convertInstitutionToInstitutionRawValue(
    institution: IInstitution | (Partial<NewInstitution> & InstitutionFormDefaults)
  ): InstitutionFormRawValue | PartialWithRequiredKeyOf<NewInstitutionFormRawValue> {
    return {
      ...institution,
      createdAt: institution.createdAt ? institution.createdAt.format(DATE_TIME_FORMAT) : undefined,
      updatedAt: institution.updatedAt ? institution.updatedAt.format(DATE_TIME_FORMAT) : undefined,
      tasks: institution.tasks ?? [],
    };
  }
}
