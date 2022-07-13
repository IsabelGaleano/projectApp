import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { MovimientosDetailComponent } from './movimientos-detail.component';

describe('Movimientos Management Detail Component', () => {
  let comp: MovimientosDetailComponent;
  let fixture: ComponentFixture<MovimientosDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MovimientosDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ movimientos: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(MovimientosDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(MovimientosDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load movimientos on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.movimientos).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
