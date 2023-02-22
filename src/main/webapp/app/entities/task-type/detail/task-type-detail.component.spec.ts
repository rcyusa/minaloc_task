import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TaskTypeDetailComponent } from './task-type-detail.component';

describe('TaskType Management Detail Component', () => {
  let comp: TaskTypeDetailComponent;
  let fixture: ComponentFixture<TaskTypeDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaskTypeDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ taskType: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(TaskTypeDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(TaskTypeDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load taskType on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.taskType).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
