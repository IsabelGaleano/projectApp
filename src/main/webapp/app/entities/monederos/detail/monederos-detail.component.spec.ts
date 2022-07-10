import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { MonederosDetailComponent } from './monederos-detail.component';

describe('Monederos Management Detail Component', () => {
  let comp: MonederosDetailComponent;
  let fixture: ComponentFixture<MonederosDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MonederosDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ monederos: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(MonederosDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(MonederosDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load monederos on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.monederos).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
