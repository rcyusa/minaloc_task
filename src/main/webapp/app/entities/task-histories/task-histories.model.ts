import dayjs from 'dayjs/esm';
import { ITask } from 'app/entities/task/task.model';
import { Status } from 'app/entities/enumerations/status.model';

export interface ITaskHistories {
  id: number;
  comment?: string | null;
  status?: Status | null;
  createdAt?: dayjs.Dayjs | null;
  updatedAt?: dayjs.Dayjs | null;
  task?: Pick<ITask, 'id' | 'title'> | null;
}

export type NewTaskHistories = Omit<ITaskHistories, 'id'> & { id: null };
