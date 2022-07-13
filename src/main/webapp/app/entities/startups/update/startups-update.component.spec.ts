import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { StartupsService } from '../service/startups.service';
import { IStartups, Startups } from '../startups.model';
import { IMonederos } from 'app/entities/monederos/monederos.model';
import { MonederosService } from 'app/entities/monederos/service/monederos.service';
import { ICategorias } from 'app/entities/categorias/categorias.model';
import { CategoriasService } from 'app/entities/categorias/service/categorias.service';

import { StartupsUpdateComponent } from './startups-update.component';

describe('Startups Management Update Component', () => {
  let comp: StartupsUpdateComponent;
  let fixture: ComponentFixture<StartupsUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let startupsService: StartupsService;
  let monederosService: MonederosService;
  let categoriasService: CategoriasService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [StartupsUpdateComponent],
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
      .overrideTemplate(StartupsUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(StartupsUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    startupsService = TestBed.inject(StartupsService);
    monederosService = TestBed.inject(MonederosService);
    categoriasService = TestBed.inject(CategoriasService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call idMonedero query and add missing value', () => {
      const startups: IStartups = { id: 456 };
      const idMonedero: IMonederos = { id: 56815 };
      startups.idMonedero = idMonedero;

      const idMonederoCollection: IMonederos[] = [{ id: 30020 }];
      jest.spyOn(monederosService, 'query').mockReturnValue(of(new HttpResponse({ body: idMonederoCollection })));
      const expectedCollection: IMonederos[] = [idMonedero, ...idMonederoCollection];
      jest.spyOn(monederosService, 'addMonederosToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ startups });
      comp.ngOnInit();

      expect(monederosService.query).toHaveBeenCalled();
      expect(monederosService.addMonederosToCollectionIfMissing).toHaveBeenCalledWith(idMonederoCollection, idMonedero);
      expect(comp.idMonederosCollection).toEqual(expectedCollection);
    });

    it('Should call Categorias query and add missing value', () => {
      const startups: IStartups = { id: 456 };
      const idCategoria: ICategorias = { id: 44154 };
      startups.idCategoria = idCategoria;

      const categoriasCollection: ICategorias[] = [{ id: 34329 }];
      jest.spyOn(categoriasService, 'query').mockReturnValue(of(new HttpResponse({ body: categoriasCollection })));
      const additionalCategorias = [idCategoria];
      const expectedCollection: ICategorias[] = [...additionalCategorias, ...categoriasCollection];
      jest.spyOn(categoriasService, 'addCategoriasToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ startups });
      comp.ngOnInit();

      expect(categoriasService.query).toHaveBeenCalled();
      expect(categoriasService.addCategoriasToCollectionIfMissing).toHaveBeenCalledWith(categoriasCollection, ...additionalCategorias);
      expect(comp.categoriasSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const startups: IStartups = { id: 456 };
      const idMonedero: IMonederos = { id: 68643 };
      startups.idMonedero = idMonedero;
      const idCategoria: ICategorias = { id: 5640 };
      startups.idCategoria = idCategoria;

      activatedRoute.data = of({ startups });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(startups));
      expect(comp.idMonederosCollection).toContain(idMonedero);
      expect(comp.categoriasSharedCollection).toContain(idCategoria);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Startups>>();
      const startups = { id: 123 };
      jest.spyOn(startupsService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ startups });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: startups }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(startupsService.update).toHaveBeenCalledWith(startups);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Startups>>();
      const startups = new Startups();
      jest.spyOn(startupsService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ startups });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: startups }));
      saveSubject.complete();

      // THEN
      expect(startupsService.create).toHaveBeenCalledWith(startups);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Startups>>();
      const startups = { id: 123 };
      jest.spyOn(startupsService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ startups });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(startupsService.update).toHaveBeenCalledWith(startups);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Tracking relationships identifiers', () => {
    describe('trackMonederosById', () => {
      it('Should return tracked Monederos primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackMonederosById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });

    describe('trackCategoriasById', () => {
      it('Should return tracked Categorias primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackCategoriasById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });
  });
});
