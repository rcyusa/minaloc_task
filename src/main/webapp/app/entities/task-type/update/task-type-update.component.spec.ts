import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { TaskTypeFormService } from './task-type-form.service';
import { TaskTypeService } from '../service/task-type.service';
import { ITaskType } from '../task-type.model';

import { TaskTypeUpdateComponent } from './task-type-update.component';

describe('TaskType Management Update Component', () => {
  let comp: TaskTypeUpdateComponent;
  let fixture: ComponentFixture<TaskTypeUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let taskTypeFormService: TaskTypeFormService;
  let taskTypeService: TaskTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [TaskTypeUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(TaskTypeUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(TaskTypeUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    taskTypeFormService = TestBed.inject(TaskTypeFormService);
    taskTypeService = TestBed.inject(TaskTypeService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const taskType: ITaskType = { id: 456 };

      activatedRoute.data = of({ taskType });
      comp.ngOnInit();

      expect(comp.taskType).toEqual(taskType);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITaskType>>();
      const taskType = { id: 123 };
      jest.spyOn(taskTypeFormService, 'getTaskType').mockReturnValue(taskType);
      jest.spyOn(taskTypeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ taskType });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: taskType }));
      saveSubject.complete();

      // THEN
      expect(taskTypeFormService.getTaskType).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(taskTypeService.update).toHaveBeenCalledWith(expect.objectContaining(taskType));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITaskType>>();
      const taskType = { id: 123 };
      jest.spyOn(taskTypeFormService, 'getTaskType').mockReturnValue({ id: null });
      jest.spyOn(taskTypeService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ taskType: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: taskType }));
      saveSubject.complete();

      // THEN
      expect(taskTypeFormService.getTaskType).toHaveBeenCalled();
      expect(taskTypeService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITaskType>>();
      const taskType = { id: 123 };
      jest.spyOn(taskTypeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ taskType });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(taskTypeService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
