import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ITaskType } from '../task-type.model';
import { TaskTypeService } from '../service/task-type.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './task-type-delete-dialog.component.html',
})
export class TaskTypeDeleteDialogComponent {
  taskType?: ITaskType;

  constructor(protected taskTypeService: TaskTypeService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.taskTypeService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
