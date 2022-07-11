import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { RolesUsuariosService } from '../service/roles-usuarios.service';

import { RolesUsuariosComponent } from './roles-usuarios.component';

describe('RolesUsuarios Management Component', () => {
  let comp: RolesUsuariosComponent;
  let fixture: ComponentFixture<RolesUsuariosComponent>;
  let service: RolesUsuariosService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [RolesUsuariosComponent],
    })
      .overrideTemplate(RolesUsuariosComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(RolesUsuariosComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(RolesUsuariosService);

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
    expect(comp.rolesUsuarios?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
