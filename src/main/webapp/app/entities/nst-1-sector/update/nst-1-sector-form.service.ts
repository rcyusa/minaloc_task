import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { INst1Sector, NewNst1Sector } from '../nst-1-sector.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts INst1Sector for edit and NewNst1SectorFormGroupInput for create.
 */
type Nst1SectorFormGroupInput = INst1Sector | PartialWithRequiredKeyOf<NewNst1Sector>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends INst1Sector | NewNst1Sector> = Omit<T, 'createdAt' | 'updatedAt'> & {
  createdAt?: string | null;
  updatedAt?: string | null;
};

type Nst1SectorFormRawValue = FormValueOf<INst1Sector>;

type NewNst1SectorFormRawValue = FormValueOf<NewNst1Sector>;

type Nst1SectorFormDefaults = Pick<NewNst1Sector, 'id' | 'createdAt' | 'updatedAt'>;

type Nst1SectorFormGroupContent = {
  id: FormControl<Nst1SectorFormRawValue['id'] | NewNst1Sector['id']>;
  name: FormControl<Nst1SectorFormRawValue['name']>;
  description: FormControl<Nst1SectorFormRawValue['description']>;
  createdAt: FormControl<Nst1SectorFormRawValue['createdAt']>;
  updatedAt: FormControl<Nst1SectorFormRawValue['updatedAt']>;
};

export type Nst1SectorFormGroup = FormGroup<Nst1SectorFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class Nst1SectorFormService {
  createNst1SectorFormGroup(nst1Sector: Nst1SectorFormGroupInput = { id: null }): Nst1SectorFormGroup {
    const nst1SectorRawValue = this.convertNst1SectorToNst1SectorRawValue({
      ...this.getFormDefaults(),
      ...nst1Sector,
    });
    return new FormGroup<Nst1SectorFormGroupContent>({
      id: new FormControl(
        { value: nst1SectorRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      name: new FormControl(nst1SectorRawValue.name, {
        validators: [Validators.required],
      }),
      description: new FormControl(nst1SectorRawValue.description, {
        validators: [Validators.required],
      }),
      createdAt: new FormControl(nst1SectorRawValue.createdAt, {
        validators: [Validators.required],
      }),
      updatedAt: new FormControl(nst1SectorRawValue.updatedAt, {
        validators: [Validators.required],
      }),
    });
  }

  getNst1Sector(form: Nst1SectorFormGroup): INst1Sector | NewNst1Sector {
    return this.convertNst1SectorRawValueToNst1Sector(form.getRawValue() as Nst1SectorFormRawValue | NewNst1SectorFormRawValue);
  }

  resetForm(form: Nst1SectorFormGroup, nst1Sector: Nst1SectorFormGroupInput): void {
    const nst1SectorRawValue = this.convertNst1SectorToNst1SectorRawValue({ ...this.getFormDefaults(), ...nst1Sector });
    form.reset(
      {
        ...nst1SectorRawValue,
        id: { value: nst1SectorRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): Nst1SectorFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      createdAt: currentTime,
      updatedAt: currentTime,
    };
  }

  private convertNst1SectorRawValueToNst1Sector(
    rawNst1Sector: Nst1SectorFormRawValue | NewNst1SectorFormRawValue
  ): INst1Sector | NewNst1Sector {
    return {
      ...rawNst1Sector,
      createdAt: dayjs(rawNst1Sector.createdAt, DATE_TIME_FORMAT),
      updatedAt: dayjs(rawNst1Sector.updatedAt, DATE_TIME_FORMAT),
    };
  }

  private convertNst1SectorToNst1SectorRawValue(
    nst1Sector: INst1Sector | (Partial<NewNst1Sector> & Nst1SectorFormDefaults)
  ): Nst1SectorFormRawValue | PartialWithRequiredKeyOf<NewNst1SectorFormRawValue> {
    return {
      ...nst1Sector,
      createdAt: nst1Sector.createdAt ? nst1Sector.createdAt.format(DATE_TIME_FORMAT) : undefined,
      updatedAt: nst1Sector.updatedAt ? nst1Sector.updatedAt.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
