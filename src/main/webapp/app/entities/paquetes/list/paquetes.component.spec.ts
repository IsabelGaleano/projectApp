import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { PaquetesService } from '../service/paquetes.service';

import { PaquetesComponent } from './paquetes.component';

describe('Paquetes Management Component', () => {
  let comp: PaquetesComponent;
  let fixture: ComponentFixture<PaquetesComponent>;
  let service: PaquetesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [PaquetesComponent],
    })
      .overrideTemplate(PaquetesComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(PaquetesComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(PaquetesService);

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
    expect(comp.paquetes?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
