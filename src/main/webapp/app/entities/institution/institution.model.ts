import dayjs from 'dayjs/esm';
import { ITask } from 'app/entities/task/task.model';

export interface IInstitution {
  id: number;
  name?: string | null;
  description?: string | null;
  createdAt?: dayjs.Dayjs | null;
  updatedAt?: dayjs.Dayjs | null;
  tasks?: Pick<ITask, 'id'>[] | null;
}

export type NewInstitution = Omit<IInstitution, 'id'> & { id: null };
