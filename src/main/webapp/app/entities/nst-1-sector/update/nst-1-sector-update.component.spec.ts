import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { Nst1SectorFormService } from './nst-1-sector-form.service';
import { Nst1SectorService } from '../service/nst-1-sector.service';
import { INst1Sector } from '../nst-1-sector.model';

import { Nst1SectorUpdateComponent } from './nst-1-sector-update.component';

describe('Nst1Sector Management Update Component', () => {
  let comp: Nst1SectorUpdateComponent;
  let fixture: ComponentFixture<Nst1SectorUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let nst1SectorFormService: Nst1SectorFormService;
  let nst1SectorService: Nst1SectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [Nst1SectorUpdateComponent],
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
      .overrideTemplate(Nst1SectorUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(Nst1SectorUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    nst1SectorFormService = TestBed.inject(Nst1SectorFormService);
    nst1SectorService = TestBed.inject(Nst1SectorService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const nst1Sector: INst1Sector = { id: 456 };

      activatedRoute.data = of({ nst1Sector });
      comp.ngOnInit();

      expect(comp.nst1Sector).toEqual(nst1Sector);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<INst1Sector>>();
      const nst1Sector = { id: 123 };
      jest.spyOn(nst1SectorFormService, 'getNst1Sector').mockReturnValue(nst1Sector);
      jest.spyOn(nst1SectorService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ nst1Sector });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: nst1Sector }));
      saveSubject.complete();

      // THEN
      expect(nst1SectorFormService.getNst1Sector).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(nst1SectorService.update).toHaveBeenCalledWith(expect.objectContaining(nst1Sector));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<INst1Sector>>();
      const nst1Sector = { id: 123 };
      jest.spyOn(nst1SectorFormService, 'getNst1Sector').mockReturnValue({ id: null });
      jest.spyOn(nst1SectorService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ nst1Sector: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: nst1Sector }));
      saveSubject.complete();

      // THEN
      expect(nst1SectorFormService.getNst1Sector).toHaveBeenCalled();
      expect(nst1SectorService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<INst1Sector>>();
      const nst1Sector = { id: 123 };
      jest.spyOn(nst1SectorService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ nst1Sector });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(nst1SectorService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
