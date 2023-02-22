import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { Nst1SectorDetailComponent } from './nst-1-sector-detail.component';

describe('Nst1Sector Management Detail Component', () => {
  let comp: Nst1SectorDetailComponent;
  let fixture: ComponentFixture<Nst1SectorDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Nst1SectorDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ nst1Sector: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(Nst1SectorDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(Nst1SectorDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load nst1Sector on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.nst1Sector).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
