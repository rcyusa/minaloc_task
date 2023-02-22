jest.mock('@ng-bootstrap/ng-bootstrap');

import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { Nst1SectorService } from '../service/nst-1-sector.service';

import { Nst1SectorDeleteDialogComponent } from './nst-1-sector-delete-dialog.component';

describe('Nst1Sector Management Delete Component', () => {
  let comp: Nst1SectorDeleteDialogComponent;
  let fixture: ComponentFixture<Nst1SectorDeleteDialogComponent>;
  let service: Nst1SectorService;
  let mockActiveModal: NgbActiveModal;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [Nst1SectorDeleteDialogComponent],
      providers: [NgbActiveModal],
    })
      .overrideTemplate(Nst1SectorDeleteDialogComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(Nst1SectorDeleteDialogComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(Nst1SectorService);
    mockActiveModal = TestBed.inject(NgbActiveModal);
  });

  describe('confirmDelete', () => {
    it('Should call delete service on confirmDelete', inject(
      [],
      fakeAsync(() => {
        // GIVEN
        jest.spyOn(service, 'delete').mockReturnValue(of(new HttpResponse({ body: {} })));

        // WHEN
        comp.confirmDelete(123);
        tick();

        // THEN
        expect(service.delete).toHaveBeenCalledWith(123);
        expect(mockActiveModal.close).toHaveBeenCalledWith('deleted');
      })
    ));

    it('Should not call delete service on clear', () => {
      // GIVEN
      jest.spyOn(service, 'delete');

      // WHEN
      comp.cancel();

      // THEN
      expect(service.delete).not.toHaveBeenCalled();
      expect(mockActiveModal.close).not.toHaveBeenCalled();
      expect(mockActiveModal.dismiss).toHaveBeenCalled();
    });
  });
});
