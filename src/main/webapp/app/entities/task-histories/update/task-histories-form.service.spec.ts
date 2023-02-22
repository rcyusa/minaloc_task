import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../task-histories.test-samples';

import { TaskHistoriesFormService } from './task-histories-form.service';

describe('TaskHistories Form Service', () => {
  let service: TaskHistoriesFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskHistoriesFormService);
  });

  describe('Service methods', () => {
    describe('createTaskHistoriesFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createTaskHistoriesFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            comment: expect.any(Object),
            status: expect.any(Object),
            createdAt: expect.any(Object),
            updatedAt: expect.any(Object),
            task: expect.any(Object),
          })
        );
      });

      it('passing ITaskHistories should create a new form with FormGroup', () => {
        const formGroup = service.createTaskHistoriesFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            comment: expect.any(Object),
            status: expect.any(Object),
            createdAt: expect.any(Object),
            updatedAt: expect.any(Object),
            task: expect.any(Object),
          })
        );
      });
    });

    describe('getTaskHistories', () => {
      it('should return NewTaskHistories for default TaskHistories initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createTaskHistoriesFormGroup(sampleWithNewData);

        const taskHistories = service.getTaskHistories(formGroup) as any;

        expect(taskHistories).toMatchObject(sampleWithNewData);
      });

      it('should return NewTaskHistories for empty TaskHistories initial value', () => {
        const formGroup = service.createTaskHistoriesFormGroup();

        const taskHistories = service.getTaskHistories(formGroup) as any;

        expect(taskHistories).toMatchObject({});
      });

      it('should return ITaskHistories', () => {
        const formGroup = service.createTaskHistoriesFormGroup(sampleWithRequiredData);

        const taskHistories = service.getTaskHistories(formGroup) as any;

        expect(taskHistories).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ITaskHistories should not enable id FormControl', () => {
        const formGroup = service.createTaskHistoriesFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewTaskHistories should disable id FormControl', () => {
        const formGroup = service.createTaskHistoriesFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
