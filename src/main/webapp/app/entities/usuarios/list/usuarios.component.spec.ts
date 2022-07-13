import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { UsuariosService } from '../service/usuarios.service';

import { UsuariosComponent } from './usuarios.component';

describe('Usuarios Management Component', () => {
  let comp: UsuariosComponent;
  let fixture: ComponentFixture<UsuariosComponent>;
  let service: UsuariosService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [UsuariosComponent],
    })
      .overrideTemplate(UsuariosComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(UsuariosComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(UsuariosService);

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
    expect(comp.usuarios?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
