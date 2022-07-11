import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { StartupsDetailComponent } from './startups-detail.component';

describe('Startups Management Detail Component', () => {
  let comp: StartupsDetailComponent;
  let fixture: ComponentFixture<StartupsDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StartupsDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ startups: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(StartupsDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(StartupsDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load startups on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.startups).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
