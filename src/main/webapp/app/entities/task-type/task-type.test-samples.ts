import dayjs from 'dayjs/esm';

import { ITaskType, NewTaskType } from './task-type.model';

export const sampleWithRequiredData: ITaskType = {
  id: 40259,
  title: 'engage',
  description: 'Triple-buffered Brand',
  createdAt: dayjs('2023-02-22T15:42'),
  updatedAt: dayjs('2023-02-22T08:17'),
};

export const sampleWithPartialData: ITaskType = {
  id: 79542,
  title: 'generation',
  description: 'navigating Automotive Program',
  createdAt: dayjs('2023-02-22T17:35'),
  updatedAt: dayjs('2023-02-22T13:24'),
};

export const sampleWithFullData: ITaskType = {
  id: 44683,
  title: 'CSS',
  description: 'panel teal',
  createdAt: dayjs('2023-02-21T23:16'),
  updatedAt: dayjs('2023-02-22T05:27'),
};

export const sampleWithNewData: NewTaskType = {
  title: 'indigo Mouse',
  description: 'Cheese digital',
  createdAt: dayjs('2023-02-22T01:07'),
  updatedAt: dayjs('2023-02-22T15:20'),
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
