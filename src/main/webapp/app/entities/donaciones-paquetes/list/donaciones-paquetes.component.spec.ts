import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { DonacionesPaquetesService } from '../service/donaciones-paquetes.service';

import { DonacionesPaquetesComponent } from './donaciones-paquetes.component';

describe('DonacionesPaquetes Management Component', () => {
  let comp: DonacionesPaquetesComponent;
  let fixture: ComponentFixture<DonacionesPaquetesComponent>;
  let service: DonacionesPaquetesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [DonacionesPaquetesComponent],
    })
      .overrideTemplate(DonacionesPaquetesComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(DonacionesPaquetesComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(DonacionesPaquetesService);

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
    expect(comp.donacionesPaquetes?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
