import dayjs from 'dayjs/esm';

import { IPosition, NewPosition } from './position.model';

export const sampleWithRequiredData: IPosition = {
  id: 98059,
  name: 'synthesize Engineer',
  description: 'Hawaii Soap',
  createdAt: dayjs('2023-02-21T23:13'),
  updatedAt: dayjs('2023-02-22T13:22'),
};

export const sampleWithPartialData: IPosition = {
  id: 6544,
  name: 'gold deposit',
  description: 'Borders Monitored Networked',
  createdAt: dayjs('2023-02-21T22:50'),
  updatedAt: dayjs('2023-02-21T20:30'),
};

export const sampleWithFullData: IPosition = {
  id: 39751,
  name: 'withdrawal transmitting',
  description: 'impactful Kansas index',
  createdAt: dayjs('2023-02-22T16:29'),
  updatedAt: dayjs('2023-02-22T08:22'),
};

export const sampleWithNewData: NewPosition = {
  name: 'forecast e-commerce Enterprise-wide',
  description: 'Loan',
  createdAt: dayjs('2023-02-22T06:08'),
  updatedAt: dayjs('2023-02-22T00:33'),
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
