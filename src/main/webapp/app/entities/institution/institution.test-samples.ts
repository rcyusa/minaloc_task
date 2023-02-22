import dayjs from 'dayjs/esm';

import { IInstitution, NewInstitution } from './institution.model';

export const sampleWithRequiredData: IInstitution = {
  id: 45351,
  name: 'Buckinghamshire deposit',
  description: 'Representative',
  createdAt: dayjs('2023-02-22T12:20'),
  updatedAt: dayjs('2023-02-22T15:09'),
};

export const sampleWithPartialData: IInstitution = {
  id: 80531,
  name: 'input',
  description: 'up hack Utah',
  createdAt: dayjs('2023-02-22T06:28'),
  updatedAt: dayjs('2023-02-22T03:22'),
};

export const sampleWithFullData: IInstitution = {
  id: 2646,
  name: 'Adaptive solid vortals',
  description: 'monetize Pennsylvania',
  createdAt: dayjs('2023-02-21T18:34'),
  updatedAt: dayjs('2023-02-22T02:15'),
};

export const sampleWithNewData: NewInstitution = {
  name: 'Chips Branding Vision-oriented',
  description: 'synthesize object-oriented',
  createdAt: dayjs('2023-02-22T09:49'),
  updatedAt: dayjs('2023-02-22T11:41'),
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
