import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { TaskHistoriesFormService } from './task-histories-form.service';
import { TaskHistoriesService } from '../service/task-histories.service';
import { ITaskHistories } from '../task-histories.model';
import { ITask } from 'app/entities/task/task.model';
import { TaskService } from 'app/entities/task/service/task.service';

import { TaskHistoriesUpdateComponent } from './task-histories-update.component';

describe('TaskHistories Management Update Component', () => {
  let comp: TaskHistoriesUpdateComponent;
  let fixture: ComponentFixture<TaskHistoriesUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let taskHistoriesFormService: TaskHistoriesFormService;
  let taskHistoriesService: TaskHistoriesService;
  let taskService: TaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [TaskHistoriesUpdateComponent],
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
      .overrideTemplate(TaskHistoriesUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(TaskHistoriesUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    taskHistoriesFormService = TestBed.inject(TaskHistoriesFormService);
    taskHistoriesService = TestBed.inject(TaskHistoriesService);
    taskService = TestBed.inject(TaskService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Task query and add missing value', () => {
      const taskHistories: ITaskHistories = { id: 456 };
      const task: ITask = { id: 47563 };
      taskHistories.task = task;

      const taskCollection: ITask[] = [{ id: 94010 }];
      jest.spyOn(taskService, 'query').mockReturnValue(of(new HttpResponse({ body: taskCollection })));
      const additionalTasks = [task];
      const expectedCollection: ITask[] = [...additionalTasks, ...taskCollection];
      jest.spyOn(taskService, 'addTaskToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ taskHistories });
      comp.ngOnInit();

      expect(taskService.query).toHaveBeenCalled();
      expect(taskService.addTaskToCollectionIfMissing).toHaveBeenCalledWith(
        taskCollection,
        ...additionalTasks.map(expect.objectContaining)
      );
      expect(comp.tasksSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const taskHistories: ITaskHistories = { id: 456 };
      const task: ITask = { id: 6839 };
      taskHistories.task = task;

      activatedRoute.data = of({ taskHistories });
      comp.ngOnInit();

      expect(comp.tasksSharedCollection).toContain(task);
      expect(comp.taskHistories).toEqual(taskHistories);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITaskHistories>>();
      const taskHistories = { id: 123 };
      jest.spyOn(taskHistoriesFormService, 'getTaskHistories').mockReturnValue(taskHistories);
      jest.spyOn(taskHistoriesService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ taskHistories });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: taskHistories }));
      saveSubject.complete();

      // THEN
      expect(taskHistoriesFormService.getTaskHistories).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(taskHistoriesService.update).toHaveBeenCalledWith(expect.objectContaining(taskHistories));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITaskHistories>>();
      const taskHistories = { id: 123 };
      jest.spyOn(taskHistoriesFormService, 'getTaskHistories').mockReturnValue({ id: null });
      jest.spyOn(taskHistoriesService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ taskHistories: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: taskHistories }));
      saveSubject.complete();

      // THEN
      expect(taskHistoriesFormService.getTaskHistories).toHaveBeenCalled();
      expect(taskHistoriesService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITaskHistories>>();
      const taskHistories = { id: 123 };
      jest.spyOn(taskHistoriesService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ taskHistories });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(taskHistoriesService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareTask', () => {
      it('Should forward to taskService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(taskService, 'compareTask');
        comp.compareTask(entity, entity2);
        expect(taskService.compareTask).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
