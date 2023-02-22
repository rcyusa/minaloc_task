import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITaskHistories } from '../task-histories.model';

@Component({
  selector: 'jhi-task-histories-detail',
  templateUrl: './task-histories-detail.component.html',
})
export class TaskHistoriesDetailComponent implements OnInit {
  taskHistories: ITaskHistories | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ taskHistories }) => {
      this.taskHistories = taskHistories;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
