import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DocumentosDetailComponent } from './documentos-detail.component';

describe('Documentos Management Detail Component', () => {
  let comp: DocumentosDetailComponent;
  let fixture: ComponentFixture<DocumentosDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DocumentosDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ documentos: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(DocumentosDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(DocumentosDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load documentos on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.documentos).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
