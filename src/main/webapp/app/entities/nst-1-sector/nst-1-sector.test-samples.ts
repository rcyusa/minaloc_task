import dayjs from 'dayjs/esm';

import { INst1Sector, NewNst1Sector } from './nst-1-sector.model';

export const sampleWithRequiredData: INst1Sector = {
  id: 80158,
  name: 'interface',
  description: 'Tasty',
  createdAt: dayjs('2023-02-22T01:16'),
  updatedAt: dayjs('2023-02-22T01:40'),
};

export const sampleWithPartialData: INst1Sector = {
  id: 31772,
  name: 'SQL partnerships',
  description: 'aggregate',
  createdAt: dayjs('2023-02-22T16:50'),
  updatedAt: dayjs('2023-02-22T14:21'),
};

export const sampleWithFullData: INst1Sector = {
  id: 13109,
  name: 'client-server state back-end',
  description: 'Card Director',
  createdAt: dayjs('2023-02-22T00:06'),
  updatedAt: dayjs('2023-02-22T13:18'),
};

export const sampleWithNewData: NewNst1Sector = {
  name: 'discrete Fresh Soft',
  description: 'bottom-line Tasty Borders',
  createdAt: dayjs('2023-02-21T19:40'),
  updatedAt: dayjs('2023-02-21T22:19'),
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
