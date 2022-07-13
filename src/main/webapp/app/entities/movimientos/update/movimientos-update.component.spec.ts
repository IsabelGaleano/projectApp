import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { MovimientosService } from '../service/movimientos.service';
import { IMovimientos, Movimientos } from '../movimientos.model';
import { IMonederos } from 'app/entities/monederos/monederos.model';
import { MonederosService } from 'app/entities/monederos/service/monederos.service';

import { MovimientosUpdateComponent } from './movimientos-update.component';

describe('Movimientos Management Update Component', () => {
  let comp: MovimientosUpdateComponent;
  let fixture: ComponentFixture<MovimientosUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let movimientosService: MovimientosService;
  let monederosService: MonederosService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [MovimientosUpdateComponent],
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
      .overrideTemplate(MovimientosUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(MovimientosUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    movimientosService = TestBed.inject(MovimientosService);
    monederosService = TestBed.inject(MonederosService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Monederos query and add missing value', () => {
      const movimientos: IMovimientos = { id: 456 };
      const idMonedero: IMonederos = { id: 33711 };
      movimientos.idMonedero = idMonedero;

      const monederosCollection: IMonederos[] = [{ id: 5597 }];
      jest.spyOn(monederosService, 'query').mockReturnValue(of(new HttpResponse({ body: monederosCollection })));
      const additionalMonederos = [idMonedero];
      const expectedCollection: IMonederos[] = [...additionalMonederos, ...monederosCollection];
      jest.spyOn(monederosService, 'addMonederosToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ movimientos });
      comp.ngOnInit();

      expect(monederosService.query).toHaveBeenCalled();
      expect(monederosService.addMonederosToCollectionIfMissing).toHaveBeenCalledWith(monederosCollection, ...additionalMonederos);
      expect(comp.monederosSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const movimientos: IMovimientos = { id: 456 };
      const idMonedero: IMonederos = { id: 51674 };
      movimientos.idMonedero = idMonedero;

      activatedRoute.data = of({ movimientos });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(movimientos));
      expect(comp.monederosSharedCollection).toContain(idMonedero);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Movimientos>>();
      const movimientos = { id: 123 };
      jest.spyOn(movimientosService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ movimientos });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: movimientos }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(movimientosService.update).toHaveBeenCalledWith(movimientos);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Movimientos>>();
      const movimientos = new Movimientos();
      jest.spyOn(movimientosService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ movimientos });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: movimientos }));
      saveSubject.complete();

      // THEN
      expect(movimientosService.create).toHaveBeenCalledWith(movimientos);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Movimientos>>();
      const movimientos = { id: 123 };
      jest.spyOn(movimientosService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ movimientos });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(movimientosService.update).toHaveBeenCalledWith(movimientos);
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
  });
});
