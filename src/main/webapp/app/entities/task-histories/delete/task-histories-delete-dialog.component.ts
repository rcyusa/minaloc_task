import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ITaskHistories } from '../task-histories.model';
import { TaskHistoriesService } from '../service/task-histories.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './task-histories-delete-dialog.component.html',
})
export class TaskHistoriesDeleteDialogComponent {
  taskHistories?: ITaskHistories;

  constructor(protected taskHistoriesService: TaskHistoriesService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.taskHistoriesService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
