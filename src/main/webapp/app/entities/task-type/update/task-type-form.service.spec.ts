import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../task-type.test-samples';

import { TaskTypeFormService } from './task-type-form.service';

describe('TaskType Form Service', () => {
  let service: TaskTypeFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskTypeFormService);
  });

  describe('Service methods', () => {
    describe('createTaskTypeFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createTaskTypeFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            title: expect.any(Object),
            description: expect.any(Object),
            createdAt: expect.any(Object),
            updatedAt: expect.any(Object),
          })
        );
      });

      it('passing ITaskType should create a new form with FormGroup', () => {
        const formGroup = service.createTaskTypeFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            title: expect.any(Object),
            description: expect.any(Object),
            createdAt: expect.any(Object),
            updatedAt: expect.any(Object),
          })
        );
      });
    });

    describe('getTaskType', () => {
      it('should return NewTaskType for default TaskType initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createTaskTypeFormGroup(sampleWithNewData);

        const taskType = service.getTaskType(formGroup) as any;

        expect(taskType).toMatchObject(sampleWithNewData);
      });

      it('should return NewTaskType for empty TaskType initial value', () => {
        const formGroup = service.createTaskTypeFormGroup();

        const taskType = service.getTaskType(formGroup) as any;

        expect(taskType).toMatchObject({});
      });

      it('should return ITaskType', () => {
        const formGroup = service.createTaskTypeFormGroup(sampleWithRequiredData);

        const taskType = service.getTaskType(formGroup) as any;

        expect(taskType).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ITaskType should not enable id FormControl', () => {
        const formGroup = service.createTaskTypeFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewTaskType should disable id FormControl', () => {
        const formGroup = service.createTaskTypeFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
