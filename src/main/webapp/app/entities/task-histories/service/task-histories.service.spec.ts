import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ITaskHistories } from '../task-histories.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../task-histories.test-samples';

import { TaskHistoriesService, RestTaskHistories } from './task-histories.service';

const requireRestSample: RestTaskHistories = {
  ...sampleWithRequiredData,
  createdAt: sampleWithRequiredData.createdAt?.toJSON(),
  updatedAt: sampleWithRequiredData.updatedAt?.toJSON(),
};

describe('TaskHistories Service', () => {
  let service: TaskHistoriesService;
  let httpMock: HttpTestingController;
  let expectedResult: ITaskHistories | ITaskHistories[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(TaskHistoriesService);
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

    it('should create a TaskHistories', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const taskHistories = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(taskHistories).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a TaskHistories', () => {
      const taskHistories = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(taskHistories).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a TaskHistories', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of TaskHistories', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a TaskHistories', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addTaskHistoriesToCollectionIfMissing', () => {
      it('should add a TaskHistories to an empty array', () => {
        const taskHistories: ITaskHistories = sampleWithRequiredData;
        expectedResult = service.addTaskHistoriesToCollectionIfMissing([], taskHistories);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(taskHistories);
      });

      it('should not add a TaskHistories to an array that contains it', () => {
        const taskHistories: ITaskHistories = sampleWithRequiredData;
        const taskHistoriesCollection: ITaskHistories[] = [
          {
            ...taskHistories,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addTaskHistoriesToCollectionIfMissing(taskHistoriesCollection, taskHistories);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a TaskHistories to an array that doesn't contain it", () => {
        const taskHistories: ITaskHistories = sampleWithRequiredData;
        const taskHistoriesCollection: ITaskHistories[] = [sampleWithPartialData];
        expectedResult = service.addTaskHistoriesToCollectionIfMissing(taskHistoriesCollection, taskHistories);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(taskHistories);
      });

      it('should add only unique TaskHistories to an array', () => {
        const taskHistoriesArray: ITaskHistories[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const taskHistoriesCollection: ITaskHistories[] = [sampleWithRequiredData];
        expectedResult = service.addTaskHistoriesToCollectionIfMissing(taskHistoriesCollection, ...taskHistoriesArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const taskHistories: ITaskHistories = sampleWithRequiredData;
        const taskHistories2: ITaskHistories = sampleWithPartialData;
        expectedResult = service.addTaskHistoriesToCollectionIfMissing([], taskHistories, taskHistories2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(taskHistories);
        expect(expectedResult).toContain(taskHistories2);
      });

      it('should accept null and undefined values', () => {
        const taskHistories: ITaskHistories = sampleWithRequiredData;
        expectedResult = service.addTaskHistoriesToCollectionIfMissing([], null, taskHistories, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(taskHistories);
      });

      it('should return initial array if no TaskHistories is added', () => {
        const taskHistoriesCollection: ITaskHistories[] = [sampleWithRequiredData];
        expectedResult = service.addTaskHistoriesToCollectionIfMissing(taskHistoriesCollection, undefined, null);
        expect(expectedResult).toEqual(taskHistoriesCollection);
      });
    });

    describe('compareTaskHistories', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareTaskHistories(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareTaskHistories(entity1, entity2);
        const compareResult2 = service.compareTaskHistories(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareTaskHistories(entity1, entity2);
        const compareResult2 = service.compareTaskHistories(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareTaskHistories(entity1, entity2);
        const compareResult2 = service.compareTaskHistories(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
