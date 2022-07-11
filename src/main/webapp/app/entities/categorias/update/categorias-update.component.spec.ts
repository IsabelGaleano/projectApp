import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { CategoriasService } from '../service/categorias.service';
import { ICategorias, Categorias } from '../categorias.model';

import { CategoriasUpdateComponent } from './categorias-update.component';

describe('Categorias Management Update Component', () => {
  let comp: CategoriasUpdateComponent;
  let fixture: ComponentFixture<CategoriasUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let categoriasService: CategoriasService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [CategoriasUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(CategoriasUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CategoriasUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    categoriasService = TestBed.inject(CategoriasService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const categorias: ICategorias = { id: 456 };

      activatedRoute.data = of({ categorias });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(categorias));
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Categorias>>();
      const categorias = { id: 123 };
      jest.spyOn(categoriasService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ categorias });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: categorias }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(categoriasService.update).toHaveBeenCalledWith(categorias);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Categorias>>();
      const categorias = new Categorias();
      jest.spyOn(categoriasService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ categorias });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: categorias }));
      saveSubject.complete();

      // THEN
      expect(categoriasService.create).toHaveBeenCalledWith(categorias);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Categorias>>();
      const categorias = { id: 123 };
      jest.spyOn(categoriasService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ categorias });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(categoriasService.update).toHaveBeenCalledWith(categorias);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
