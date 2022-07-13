import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { MensajesService } from '../service/mensajes.service';

import { MensajesComponent } from './mensajes.component';

describe('Mensajes Management Component', () => {
  let comp: MensajesComponent;
  let fixture: ComponentFixture<MensajesComponent>;
  let service: MensajesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [MensajesComponent],
    })
      .overrideTemplate(MensajesComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(MensajesComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(MensajesService);

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
    expect(comp.mensajes?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
