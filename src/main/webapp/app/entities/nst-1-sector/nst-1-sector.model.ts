import dayjs from 'dayjs/esm';

export interface INst1Sector {
  id: number;
  name?: string | null;
  description?: string | null;
  createdAt?: dayjs.Dayjs | null;
  updatedAt?: dayjs.Dayjs | null;
}

export type NewNst1Sector = Omit<INst1Sector, 'id'> & { id: null };
