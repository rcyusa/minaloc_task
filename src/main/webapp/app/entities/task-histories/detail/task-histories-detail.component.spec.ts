import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TaskHistoriesDetailComponent } from './task-histories-detail.component';

describe('TaskHistories Management Detail Component', () => {
  let comp: TaskHistoriesDetailComponent;
  let fixture: ComponentFixture<TaskHistoriesDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaskHistoriesDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ taskHistories: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(TaskHistoriesDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(TaskHistoriesDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load taskHistories on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.taskHistories).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
