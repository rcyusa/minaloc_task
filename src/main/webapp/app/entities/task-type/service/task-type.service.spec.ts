import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ITaskType } from '../task-type.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../task-type.test-samples';

import { TaskTypeService, RestTaskType } from './task-type.service';

const requireRestSample: RestTaskType = {
  ...sampleWithRequiredData,
  createdAt: sampleWithRequiredData.createdAt?.toJSON(),
  updatedAt: sampleWithRequiredData.updatedAt?.toJSON(),
};

describe('TaskType Service', () => {
  let service: TaskTypeService;
  let httpMock: HttpTestingController;
  let expectedResult: ITaskType | ITaskType[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(TaskTypeService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should create a TaskType', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const taskType = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(taskType).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a TaskType', () => {
      const taskType = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(taskType).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a TaskType', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of TaskType', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a TaskType', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addTaskTypeToCollectionIfMissing', () => {
      it('should add a TaskType to an empty array', () => {
        const taskType: ITaskType = sampleWithRequiredData;
        expectedResult = service.addTaskTypeToCollectionIfMissing([], taskType);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(taskType);
      });

      it('should not add a TaskType to an array that contains it', () => {
        const taskType: ITaskType = sampleWithRequiredData;
        const taskTypeCollection: ITaskType[] = [
          {
            ...taskType,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addTaskTypeToCollectionIfMissing(taskTypeCollection, taskType);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a TaskType to an array that doesn't contain it", () => {
        const taskType: ITaskType = sampleWithRequiredData;
        const taskTypeCollection: ITaskType[] = [sampleWithPartialData];
        expectedResult = service.addTaskTypeToCollectionIfMissing(taskTypeCollection, taskType);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(taskType);
      });

      it('should add only unique TaskType to an array', () => {
        const taskTypeArray: ITaskType[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const taskTypeCollection: ITaskType[] = [sampleWithRequiredData];
        expectedResult = service.addTaskTypeToCollectionIfMissing(taskTypeCollection, ...taskTypeArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const taskType: ITaskType = sampleWithRequiredData;
        const taskType2: ITaskType = sampleWithPartialData;
        expectedResult = service.addTaskTypeToCollectionIfMissing([], taskType, taskType2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(taskType);
        expect(expectedResult).toContain(taskType2);
      });

      it('should accept null and undefined values', () => {
        const taskType: ITaskType = sampleWithRequiredData;
        expectedResult = service.addTaskTypeToCollectionIfMissing([], null, taskType, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(taskType);
      });

      it('should return initial array if no TaskType is added', () => {
        const taskTypeCollection: ITaskType[] = [sampleWithRequiredData];
        expectedResult = service.addTaskTypeToCollectionIfMissing(taskTypeCollection, undefined, null);
        expect(expectedResult).toEqual(taskTypeCollection);
      });
    });

    describe('compareTaskType', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareTaskType(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareTaskType(entity1, entity2);
        const compareResult2 = service.compareTaskType(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareTaskType(entity1, entity2);
        const compareResult2 = service.compareTaskType(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareTaskType(entity1, entity2);
        const compareResult2 = service.compareTaskType(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
