import dayjs from 'dayjs/esm';

export interface ITaskType {
  id: number;
  title?: string | null;
  description?: string | null;
  createdAt?: dayjs.Dayjs | null;
  updatedAt?: dayjs.Dayjs | null;
}

export type NewTaskType = Omit<ITaskType, 'id'> & { id: null };
