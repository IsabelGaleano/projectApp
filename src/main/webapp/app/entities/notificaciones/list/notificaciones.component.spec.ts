import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { NotificacionesService } from '../service/notificaciones.service';

import { NotificacionesComponent } from './notificaciones.component';

describe('Notificaciones Management Component', () => {
  let comp: NotificacionesComponent;
  let fixture: ComponentFixture<NotificacionesComponent>;
  let service: NotificacionesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [NotificacionesComponent],
    })
      .overrideTemplate(NotificacionesComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(NotificacionesComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(NotificacionesService);

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
    expect(comp.notificaciones?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
