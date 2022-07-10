import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { CodigosService } from '../service/codigos.service';

import { CodigosComponent } from './codigos.component';

describe('Codigos Management Component', () => {
  let comp: CodigosComponent;
  let fixture: ComponentFixture<CodigosComponent>;
  let service: CodigosService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [CodigosComponent],
    })
      .overrideTemplate(CodigosComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CodigosComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(CodigosService);

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
    expect(comp.codigos?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
