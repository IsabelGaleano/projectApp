import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { FacturasService } from '../service/facturas.service';

import { FacturasComponent } from './facturas.component';

describe('Facturas Management Component', () => {
  let comp: FacturasComponent;
  let fixture: ComponentFixture<FacturasComponent>;
  let service: FacturasService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [FacturasComponent],
    })
      .overrideTemplate(FacturasComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(FacturasComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(FacturasService);

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
    expect(comp.facturas?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
