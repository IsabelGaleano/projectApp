import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { RastreadorDetailComponent } from './rastreador-detail.component';

describe('Rastreador Management Detail Component', () => {
  let comp: RastreadorDetailComponent;
  let fixture: ComponentFixture<RastreadorDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RastreadorDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ rastreador: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(RastreadorDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(RastreadorDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load rastreador on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.rastreador).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
