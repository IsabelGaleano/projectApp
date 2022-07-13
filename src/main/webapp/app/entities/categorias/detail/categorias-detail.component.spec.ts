import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CategoriasDetailComponent } from './categorias-detail.component';

describe('Categorias Management Detail Component', () => {
  let comp: CategoriasDetailComponent;
  let fixture: ComponentFixture<CategoriasDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategoriasDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ categorias: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(CategoriasDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(CategoriasDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load categorias on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.categorias).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
