import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { VotosDetailComponent } from './votos-detail.component';

describe('Votos Management Detail Component', () => {
  let comp: VotosDetailComponent;
  let fixture: ComponentFixture<VotosDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VotosDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ votos: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(VotosDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(VotosDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load votos on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.votos).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
