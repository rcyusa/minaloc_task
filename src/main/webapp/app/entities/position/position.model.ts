import dayjs from 'dayjs/esm';
import { IDepartment } from 'app/entities/department/department.model';
import { ITask } from 'app/entities/task/task.model';

export interface IPosition {
  id: number;
  name?: string | null;
  description?: string | null;
  createdAt?: dayjs.Dayjs | null;
  updatedAt?: dayjs.Dayjs | null;
  department?: Pick<IDepartment, 'id' | 'name'> | null;
  tasks?: Pick<ITask, 'id'>[] | null;
}

export type NewPosition = Omit<IPosition, 'id'> & { id: null };
