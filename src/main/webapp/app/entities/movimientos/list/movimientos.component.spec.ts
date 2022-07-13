import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { MovimientosService } from '../service/movimientos.service';

import { MovimientosComponent } from './movimientos.component';

describe('Movimientos Management Component', () => {
  let comp: MovimientosComponent;
  let fixture: ComponentFixture<MovimientosComponent>;
  let service: MovimientosService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [MovimientosComponent],
    })
      .overrideTemplate(MovimientosComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(MovimientosComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(MovimientosService);

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
    expect(comp.movimientos?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
