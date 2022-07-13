import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { PlanesInversionService } from '../service/planes-inversion.service';

import { PlanesInversionComponent } from './planes-inversion.component';

describe('PlanesInversion Management Component', () => {
  let comp: PlanesInversionComponent;
  let fixture: ComponentFixture<PlanesInversionComponent>;
  let service: PlanesInversionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [PlanesInversionComponent],
    })
      .overrideTemplate(PlanesInversionComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(PlanesInversionComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(PlanesInversionService);

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
    expect(comp.planesInversions?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
