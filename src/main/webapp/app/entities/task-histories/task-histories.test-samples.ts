import dayjs from 'dayjs/esm';

import { Status } from 'app/entities/enumerations/status.model';

import { ITaskHistories, NewTaskHistories } from './task-histories.model';

export const sampleWithRequiredData: ITaskHistories = {
  id: 38735,
  comment: 'matrix parsing',
  status: Status['OFF_TRACK'],
  createdAt: dayjs('2023-02-22T04:28'),
  updatedAt: dayjs('2023-02-21T23:02'),
};

export const sampleWithPartialData: ITaskHistories = {
  id: 29677,
  comment: 'microchip Mauritius',
  status: Status['OFF_TRACK'],
  createdAt: dayjs('2023-02-22T13:10'),
  updatedAt: dayjs('2023-02-22T03:18'),
};

export const sampleWithFullData: ITaskHistories = {
  id: 91479,
  comment: 'Mountains',
  status: Status['ON_TRACK'],
  createdAt: dayjs('2023-02-21T21:50'),
  updatedAt: dayjs('2023-02-22T14:37'),
};

export const sampleWithNewData: NewTaskHistories = {
  comment: 'Cove RAM',
  status: Status['OVER_DUE'],
  createdAt: dayjs('2023-02-22T13:42'),
  updatedAt: dayjs('2023-02-22T02:02'),
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
