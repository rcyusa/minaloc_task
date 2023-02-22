import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { TaskFormService } from './task-form.service';
import { TaskService } from '../service/task.service';
import { ITask } from '../task.model';
import { IInstitution } from 'app/entities/institution/institution.model';
import { InstitutionService } from 'app/entities/institution/service/institution.service';
import { IPosition } from 'app/entities/position/position.model';
import { PositionService } from 'app/entities/position/service/position.service';
import { ITaskType } from 'app/entities/task-type/task-type.model';
import { TaskTypeService } from 'app/entities/task-type/service/task-type.service';
import { INst1Sector } from 'app/entities/nst-1-sector/nst-1-sector.model';
import { Nst1SectorService } from 'app/entities/nst-1-sector/service/nst-1-sector.service';

import { TaskUpdateComponent } from './task-update.component';

describe('Task Management Update Component', () => {
  let comp: TaskUpdateComponent;
  let fixture: ComponentFixture<TaskUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let taskFormService: TaskFormService;
  let taskService: TaskService;
  let institutionService: InstitutionService;
  let positionService: PositionService;
  let taskTypeService: TaskTypeService;
  let nst1SectorService: Nst1SectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [TaskUpdateComponent],
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
      .overrideTemplate(TaskUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(TaskUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    taskFormService = TestBed.inject(TaskFormService);
    taskService = TestBed.inject(TaskService);
    institutionService = TestBed.inject(InstitutionService);
    positionService = TestBed.inject(PositionService);
    taskTypeService = TestBed.inject(TaskTypeService);
    nst1SectorService = TestBed.inject(Nst1SectorService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Institution query and add missing value', () => {
      const task: ITask = { id: 456 };
      const institutions: IInstitution[] = [{ id: 65716 }];
      task.institutions = institutions;

      const institutionCollection: IInstitution[] = [{ id: 27334 }];
      jest.spyOn(institutionService, 'query').mockReturnValue(of(new HttpResponse({ body: institutionCollection })));
      const additionalInstitutions = [...institutions];
      const expectedCollection: IInstitution[] = [...additionalInstitutions, ...institutionCollection];
      jest.spyOn(institutionService, 'addInstitutionToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ task });
      comp.ngOnInit();

      expect(institutionService.query).toHaveBeenCalled();
      expect(institutionService.addInstitutionToCollectionIfMissing).toHaveBeenCalledWith(
        institutionCollection,
        ...additionalInstitutions.map(expect.objectContaining)
      );
      expect(comp.institutionsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Position query and add missing value', () => {
      const task: ITask = { id: 456 };
      const positions: IPosition[] = [{ id: 47641 }];
      task.positions = positions;

      const positionCollection: IPosition[] = [{ id: 41097 }];
      jest.spyOn(positionService, 'query').mockReturnValue(of(new HttpResponse({ body: positionCollection })));
      const additionalPositions = [...positions];
      const expectedCollection: IPosition[] = [...additionalPositions, ...positionCollection];
      jest.spyOn(positionService, 'addPositionToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ task });
      comp.ngOnInit();

      expect(positionService.query).toHaveBeenCalled();
      expect(positionService.addPositionToCollectionIfMissing).toHaveBeenCalledWith(
        positionCollection,
        ...additionalPositions.map(expect.objectContaining)
      );
      expect(comp.positionsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call TaskType query and add missing value', () => {
      const task: ITask = { id: 456 };
      const taskType: ITaskType = { id: 36723 };
      task.taskType = taskType;

      const taskTypeCollection: ITaskType[] = [{ id: 74205 }];
      jest.spyOn(taskTypeService, 'query').mockReturnValue(of(new HttpResponse({ body: taskTypeCollection })));
      const additionalTaskTypes = [taskType];
      const expectedCollection: ITaskType[] = [...additionalTaskTypes, ...taskTypeCollection];
      jest.spyOn(taskTypeService, 'addTaskTypeToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ task });
      comp.ngOnInit();

      expect(taskTypeService.query).toHaveBeenCalled();
      expect(taskTypeService.addTaskTypeToCollectionIfMissing).toHaveBeenCalledWith(
        taskTypeCollection,
        ...additionalTaskTypes.map(expect.objectContaining)
      );
      expect(comp.taskTypesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Nst1Sector query and add missing value', () => {
      const task: ITask = { id: 456 };
      const nst1Sector: INst1Sector = { id: 16148 };
      task.nst1Sector = nst1Sector;

      const nst1SectorCollection: INst1Sector[] = [{ id: 49168 }];
      jest.spyOn(nst1SectorService, 'query').mockReturnValue(of(new HttpResponse({ body: nst1SectorCollection })));
      const additionalNst1Sectors = [nst1Sector];
      const expectedCollection: INst1Sector[] = [...additionalNst1Sectors, ...nst1SectorCollection];
      jest.spyOn(nst1SectorService, 'addNst1SectorToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ task });
      comp.ngOnInit();

      expect(nst1SectorService.query).toHaveBeenCalled();
      expect(nst1SectorService.addNst1SectorToCollectionIfMissing).toHaveBeenCalledWith(
        nst1SectorCollection,
        ...additionalNst1Sectors.map(expect.objectContaining)
      );
      expect(comp.nst1SectorsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const task: ITask = { id: 456 };
      const institution: IInstitution = { id: 1331 };
      task.institutions = [institution];
      const position: IPosition = { id: 13045 };
      task.positions = [position];
      const taskType: ITaskType = { id: 43719 };
      task.taskType = taskType;
      const nst1Sector: INst1Sector = { id: 45589 };
      task.nst1Sector = nst1Sector;

      activatedRoute.data = of({ task });
      comp.ngOnInit();

      expect(comp.institutionsSharedCollection).toContain(institution);
      expect(comp.positionsSharedCollection).toContain(position);
      expect(comp.taskTypesSharedCollection).toContain(taskType);
      expect(comp.nst1SectorsSharedCollection).toContain(nst1Sector);
      expect(comp.task).toEqual(task);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITask>>();
      const task = { id: 123 };
      jest.spyOn(taskFormService, 'getTask').mockReturnValue(task);
      jest.spyOn(taskService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ task });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: task }));
      saveSubject.complete();

      // THEN
      expect(taskFormService.getTask).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(taskService.update).toHaveBeenCalledWith(expect.objectContaining(task));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITask>>();
      const task = { id: 123 };
      jest.spyOn(taskFormService, 'getTask').mockReturnValue({ id: null });
      jest.spyOn(taskService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ task: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: task }));
      saveSubject.complete();

      // THEN
      expect(taskFormService.getTask).toHaveBeenCalled();
      expect(taskService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITask>>();
      const task = { id: 123 };
      jest.spyOn(taskService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ task });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(taskService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareInstitution', () => {
      it('Should forward to institutionService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(institutionService, 'compareInstitution');
        comp.compareInstitution(entity, entity2);
        expect(institutionService.compareInstitution).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('comparePosition', () => {
      it('Should forward to positionService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(positionService, 'comparePosition');
        comp.comparePosition(entity, entity2);
        expect(positionService.comparePosition).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareTaskType', () => {
      it('Should forward to taskTypeService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(taskTypeService, 'compareTaskType');
        comp.compareTaskType(entity, entity2);
        expect(taskTypeService.compareTaskType).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareNst1Sector', () => {
      it('Should forward to nst1SectorService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(nst1SectorService, 'compareNst1Sector');
        comp.compareNst1Sector(entity, entity2);
        expect(nst1SectorService.compareNst1Sector).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
