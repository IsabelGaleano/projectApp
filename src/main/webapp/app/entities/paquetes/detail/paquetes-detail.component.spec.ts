import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PaquetesDetailComponent } from './paquetes-detail.component';

describe('Paquetes Management Detail Component', () => {
  let comp: PaquetesDetailComponent;
  let fixture: ComponentFixture<PaquetesDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaquetesDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ paquetes: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(PaquetesDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(PaquetesDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load paquetes on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.paquetes).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
