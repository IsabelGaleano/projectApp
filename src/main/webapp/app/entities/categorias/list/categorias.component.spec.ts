import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { CategoriasService } from '../service/categorias.service';

import { CategoriasComponent } from './categorias.component';

describe('Categorias Management Component', () => {
  let comp: CategoriasComponent;
  let fixture: ComponentFixture<CategoriasComponent>;
  let service: CategoriasService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [CategoriasComponent],
    })
      .overrideTemplate(CategoriasComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CategoriasComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(CategoriasService);

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
    expect(comp.categorias?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
