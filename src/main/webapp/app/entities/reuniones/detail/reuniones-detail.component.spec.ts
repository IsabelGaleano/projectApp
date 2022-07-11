import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ReunionesDetailComponent } from './reuniones-detail.component';

describe('Reuniones Management Detail Component', () => {
  let comp: ReunionesDetailComponent;
  let fixture: ComponentFixture<ReunionesDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReunionesDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ reuniones: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(ReunionesDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(ReunionesDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load reuniones on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.reuniones).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
