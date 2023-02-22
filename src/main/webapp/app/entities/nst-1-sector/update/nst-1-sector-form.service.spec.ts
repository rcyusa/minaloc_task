import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../nst-1-sector.test-samples';

import { Nst1SectorFormService } from './nst-1-sector-form.service';

describe('Nst1Sector Form Service', () => {
  let service: Nst1SectorFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Nst1SectorFormService);
  });

  describe('Service methods', () => {
    describe('createNst1SectorFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createNst1SectorFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            name: expect.any(Object),
            description: expect.any(Object),
            createdAt: expect.any(Object),
            updatedAt: expect.any(Object),
          })
        );
      });

      it('passing INst1Sector should create a new form with FormGroup', () => {
        const formGroup = service.createNst1SectorFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            name: expect.any(Object),
            description: expect.any(Object),
            createdAt: expect.any(Object),
            updatedAt: expect.any(Object),
          })
        );
      });
    });

    describe('getNst1Sector', () => {
      it('should return NewNst1Sector for default Nst1Sector initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createNst1SectorFormGroup(sampleWithNewData);

        const nst1Sector = service.getNst1Sector(formGroup) as any;

        expect(nst1Sector).toMatchObject(sampleWithNewData);
      });

      it('should return NewNst1Sector for empty Nst1Sector initial value', () => {
        const formGroup = service.createNst1SectorFormGroup();

        const nst1Sector = service.getNst1Sector(formGroup) as any;

        expect(nst1Sector).toMatchObject({});
      });

      it('should return INst1Sector', () => {
        const formGroup = service.createNst1SectorFormGroup(sampleWithRequiredData);

        const nst1Sector = service.getNst1Sector(formGroup) as any;

        expect(nst1Sector).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing INst1Sector should not enable id FormControl', () => {
        const formGroup = service.createNst1SectorFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewNst1Sector should disable id FormControl', () => {
        const formGroup = service.createNst1SectorFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
