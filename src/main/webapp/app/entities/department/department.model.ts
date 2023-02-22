import dayjs from 'dayjs/esm';

export interface IDepartment {
  id: number;
  name?: string | null;
  createdAt?: dayjs.Dayjs | null;
  updatedAt?: dayjs.Dayjs | null;
}

export type NewDepartment = Omit<IDepartment, 'id'> & { id: null };
