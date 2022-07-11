import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { DocumentosService } from '../service/documentos.service';

import { DocumentosComponent } from './documentos.component';

describe('Documentos Management Component', () => {
  let comp: DocumentosComponent;
  let fixture: ComponentFixture<DocumentosComponent>;
  let service: DocumentosService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [DocumentosComponent],
    })
      .overrideTemplate(DocumentosComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(DocumentosComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(DocumentosService);

    const headers = new HttpHeaders();
    jest.spyOn(service, 'query').mockReturnValue(
      of(
        new HttpResponse({
          body: [{ id: 123 }],
          headers,
        })
      )
    );
  });

  it('Should call load all on init', () => {
    // WHEN
    comp.ngOnInit();

    // THEN
    expect(service.query).toHaveBeenCalled();
    expect(comp.documentos?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
