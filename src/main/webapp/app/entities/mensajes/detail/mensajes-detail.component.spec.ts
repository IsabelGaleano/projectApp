import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { MensajesDetailComponent } from './mensajes-detail.component';

describe('Mensajes Management Detail Component', () => {
  let comp: MensajesDetailComponent;
  let fixture: ComponentFixture<MensajesDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MensajesDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ mensajes: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(MensajesDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(MensajesDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load mensajes on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.mensajes).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
