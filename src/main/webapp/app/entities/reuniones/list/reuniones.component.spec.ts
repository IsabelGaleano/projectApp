import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { ReunionesService } from '../service/reuniones.service';

import { ReunionesComponent } from './reuniones.component';

describe('Reuniones Management Component', () => {
  let comp: ReunionesComponent;
  let fixture: ComponentFixture<ReunionesComponent>;
  let service: ReunionesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ReunionesComponent],
    })
      .overrideTemplate(ReunionesComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ReunionesComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(ReunionesService);

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
    expect(comp.reuniones?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
