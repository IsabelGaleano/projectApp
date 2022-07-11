import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { RastreadorService } from '../service/rastreador.service';

import { RastreadorComponent } from './rastreador.component';

describe('Rastreador Management Component', () => {
  let comp: RastreadorComponent;
  let fixture: ComponentFixture<RastreadorComponent>;
  let service: RastreadorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [RastreadorComponent],
    })
      .overrideTemplate(RastreadorComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(RastreadorComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(RastreadorService);

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
    expect(comp.rastreadors?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
