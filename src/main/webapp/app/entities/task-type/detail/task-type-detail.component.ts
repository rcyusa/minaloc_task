import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITaskType } from '../task-type.model';

@Component({
  selector: 'jhi-task-type-detail',
  templateUrl: './task-type-detail.component.html',
})
export class TaskTypeDetailComponent implements OnInit {
  taskType: ITaskType | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ taskType }) => {
      this.taskType = taskType;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
