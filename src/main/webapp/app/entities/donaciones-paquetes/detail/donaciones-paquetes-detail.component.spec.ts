import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DonacionesPaquetesDetailComponent } from './donaciones-paquetes-detail.component';

describe('DonacionesPaquetes Management Detail Component', () => {
  let comp: DonacionesPaquetesDetailComponent;
  let fixture: ComponentFixture<DonacionesPaquetesDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DonacionesPaquetesDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ donacionesPaquetes: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(DonacionesPaquetesDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(DonacionesPaquetesDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load donacionesPaquetes on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.donacionesPaquetes).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
