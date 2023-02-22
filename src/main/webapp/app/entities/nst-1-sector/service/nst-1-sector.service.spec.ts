import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { INst1Sector } from '../nst-1-sector.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../nst-1-sector.test-samples';

import { Nst1SectorService, RestNst1Sector } from './nst-1-sector.service';

const requireRestSample: RestNst1Sector = {
  ...sampleWithRequiredData,
  createdAt: sampleWithRequiredData.createdAt?.toJSON(),
  updatedAt: sampleWithRequiredData.updatedAt?.toJSON(),
};

describe('Nst1Sector Service', () => {
  let service: Nst1SectorService;
  let httpMock: HttpTestingController;
  let expectedResult: INst1Sector | INst1Sector[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(Nst1SectorService);
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

    it('should create a Nst1Sector', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const nst1Sector = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(nst1Sector).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Nst1Sector', () => {
      const nst1Sector = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(nst1Sector).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Nst1Sector', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Nst1Sector', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Nst1Sector', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addNst1SectorToCollectionIfMissing', () => {
      it('should add a Nst1Sector to an empty array', () => {
        const nst1Sector: INst1Sector = sampleWithRequiredData;
        expectedResult = service.addNst1SectorToCollectionIfMissing([], nst1Sector);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(nst1Sector);
      });

      it('should not add a Nst1Sector to an array that contains it', () => {
        const nst1Sector: INst1Sector = sampleWithRequiredData;
        const nst1SectorCollection: INst1Sector[] = [
          {
            ...nst1Sector,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addNst1SectorToCollectionIfMissing(nst1SectorCollection, nst1Sector);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Nst1Sector to an array that doesn't contain it", () => {
        const nst1Sector: INst1Sector = sampleWithRequiredData;
        const nst1SectorCollection: INst1Sector[] = [sampleWithPartialData];
        expectedResult = service.addNst1SectorToCollectionIfMissing(nst1SectorCollection, nst1Sector);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(nst1Sector);
      });

      it('should add only unique Nst1Sector to an array', () => {
        const nst1SectorArray: INst1Sector[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const nst1SectorCollection: INst1Sector[] = [sampleWithRequiredData];
        expectedResult = service.addNst1SectorToCollectionIfMissing(nst1SectorCollection, ...nst1SectorArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const nst1Sector: INst1Sector = sampleWithRequiredData;
        const nst1Sector2: INst1Sector = sampleWithPartialData;
        expectedResult = service.addNst1SectorToCollectionIfMissing([], nst1Sector, nst1Sector2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(nst1Sector);
        expect(expectedResult).toContain(nst1Sector2);
      });

      it('should accept null and undefined values', () => {
        const nst1Sector: INst1Sector = sampleWithRequiredData;
        expectedResult = service.addNst1SectorToCollectionIfMissing([], null, nst1Sector, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(nst1Sector);
      });

      it('should return initial array if no Nst1Sector is added', () => {
        const nst1SectorCollection: INst1Sector[] = [sampleWithRequiredData];
        expectedResult = service.addNst1SectorToCollectionIfMissing(nst1SectorCollection, undefined, null);
        expect(expectedResult).toEqual(nst1SectorCollection);
      });
    });

    describe('compareNst1Sector', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareNst1Sector(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareNst1Sector(entity1, entity2);
        const compareResult2 = service.compareNst1Sector(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareNst1Sector(entity1, entity2);
        const compareResult2 = service.compareNst1Sector(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareNst1Sector(entity1, entity2);
        const compareResult2 = service.compareNst1Sector(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
