import dayjs from 'dayjs/esm';

import { IDepartment, NewDepartment } from './department.model';

export const sampleWithRequiredData: IDepartment = {
  id: 39095,
  name: 'neutral markets',
  createdAt: dayjs('2023-02-22T14:53'),
  updatedAt: dayjs('2023-02-22T00:10'),
};

export const sampleWithPartialData: IDepartment = {
  id: 10418,
  name: 'access',
  createdAt: dayjs('2023-02-22T03:24'),
  updatedAt: dayjs('2023-02-22T14:32'),
};

export const sampleWithFullData: IDepartment = {
  id: 44144,
  name: 'blue Savings',
  createdAt: dayjs('2023-02-21T19:09'),
  updatedAt: dayjs('2023-02-21T22:16'),
};

export const sampleWithNewData: NewDepartment = {
  name: 'navigate',
  createdAt: dayjs('2023-02-22T09:07'),
  updatedAt: dayjs('2023-02-21T23:12'),
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
