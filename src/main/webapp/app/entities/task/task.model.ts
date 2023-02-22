import dayjs from 'dayjs/esm';
import { IInstitution } from 'app/entities/institution/institution.model';
import { IPosition } from 'app/entities/position/position.model';
import { ITaskType } from 'app/entities/task-type/task-type.model';
import { INst1Sector } from 'app/entities/nst-1-sector/nst-1-sector.model';
import { Status } from 'app/entities/enumerations/status.model';
import { Priority } from 'app/entities/enumerations/priority.model';
import { Progress } from 'app/entities/enumerations/progress.model';

export interface ITask {
  id: number;
  title?: string | null;
  startDate?: dayjs.Dayjs | null;
  endDate?: dayjs.Dayjs | null;
  status?: Status | null;
  priority?: Priority | null;
  progress?: Progress | null;
  description?: string | null;
  createdAt?: dayjs.Dayjs | null;
  updatedAt?: dayjs.Dayjs | null;
  institutions?: Pick<IInstitution, 'id' | 'name'>[] | null;
  positions?: Pick<IPosition, 'id' | 'name'>[] | null;
  taskType?: Pick<ITaskType, 'id' | 'title'> | null;
  nst1Sector?: Pick<INst1Sector, 'id' | 'name'> | null;
}

export type NewTask = Omit<ITask, 'id'> & { id: null };
