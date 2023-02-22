import dayjs from 'dayjs/esm';

import { Status } from 'app/entities/enumerations/status.model';
import { Priority } from 'app/entities/enumerations/priority.model';
import { Progress } from 'app/entities/enumerations/progress.model';

import { ITask, NewTask } from './task.model';

export const sampleWithRequiredData: ITask = {
  id: 37978,
  title: 'CSS Account Up-sized',
  startDate: dayjs('2023-02-22T17:12'),
  endDate: dayjs('2023-02-22T11:09'),
  status: Status['OFF_TRACK'],
  priority: Priority['LOW'],
  progress: Progress['D'],
  description: 'Research structure back-end',
  createdAt: dayjs('2023-02-21T20:43'),
  updatedAt: dayjs('2023-02-21T18:56'),
};

export const sampleWithPartialData: ITask = {
  id: 57163,
  title: 'programming virtual auxiliary',
  startDate: dayjs('2023-02-22T01:14'),
  endDate: dayjs('2023-02-22T02:25'),
  status: Status['OVER_DUE'],
  priority: Priority['LOW'],
  progress: Progress['D'],
  description: 'cross-platform pink',
  createdAt: dayjs('2023-02-22T13:10'),
  updatedAt: dayjs('2023-02-22T14:42'),
};

export const sampleWithFullData: ITask = {
  id: 45200,
  title: 'application Zambian',
  startDate: dayjs('2023-02-22T00:47'),
  endDate: dayjs('2023-02-21T18:47'),
  status: Status['OVER_DUE'],
  priority: Priority['MEDIUM'],
  progress: Progress['A'],
  description: 'Clothing Account Steel',
  createdAt: dayjs('2023-02-22T07:00'),
  updatedAt: dayjs('2023-02-22T13:12'),
};

export const sampleWithNewData: NewTask = {
  title: 'array',
  startDate: dayjs('2023-02-22T05:21'),
  endDate: dayjs('2023-02-22T16:38'),
  status: Status['COMPLETED'],
  priority: Priority['HIGH'],
  progress: Progress['D'],
  description: 'Interactions Bike',
  createdAt: dayjs('2023-02-22T08:03'),
  updatedAt: dayjs('2023-02-22T12:27'),
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
