import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PlanesInversionDetailComponent } from './planes-inversion-detail.component';

describe('PlanesInversion Management Detail Component', () => {
  let comp: PlanesInversionDetailComponent;
  let fixture: ComponentFixture<PlanesInversionDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlanesInversionDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ planesInversion: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(PlanesInversionDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(PlanesInversionDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load planesInversion on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.planesInversion).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
