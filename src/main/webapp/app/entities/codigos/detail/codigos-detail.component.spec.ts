import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CodigosDetailComponent } from './codigos-detail.component';

describe('Codigos Management Detail Component', () => {
  let comp: CodigosDetailComponent;
  let fixture: ComponentFixture<CodigosDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CodigosDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ codigos: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(CodigosDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(CodigosDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load codigos on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.codigos).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
