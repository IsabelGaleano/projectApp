import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { RastreadorService } from '../service/rastreador.service';
import { IRastreador, Rastreador } from '../rastreador.model';
import { IDonacionesPaquetes } from 'app/entities/donaciones-paquetes/donaciones-paquetes.model';
import { DonacionesPaquetesService } from 'app/entities/donaciones-paquetes/service/donaciones-paquetes.service';

import { RastreadorUpdateComponent } from './rastreador-update.component';

describe('Rastreador Management Update Component', () => {
  let comp: RastreadorUpdateComponent;
  let fixture: ComponentFixture<RastreadorUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let rastreadorService: RastreadorService;
  let donacionesPaquetesService: DonacionesPaquetesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [RastreadorUpdateComponent],
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
      .overrideTemplate(RastreadorUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(RastreadorUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    rastreadorService = TestBed.inject(RastreadorService);
    donacionesPaquetesService = TestBed.inject(DonacionesPaquetesService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call DonacionesPaquetes query and add missing value', () => {
      const rastreador: IRastreador = { id: 456 };
      const idDonacionPaquete: IDonacionesPaquetes = { id: 87398 };
      rastreador.idDonacionPaquete = idDonacionPaquete;

      const donacionesPaquetesCollection: IDonacionesPaquetes[] = [{ id: 6054 }];
      jest.spyOn(donacionesPaquetesService, 'query').mockReturnValue(of(new HttpResponse({ body: donacionesPaquetesCollection })));
      const additionalDonacionesPaquetes = [idDonacionPaquete];
      const expectedCollection: IDonacionesPaquetes[] = [...additionalDonacionesPaquetes, ...donacionesPaquetesCollection];
      jest.spyOn(donacionesPaquetesService, 'addDonacionesPaquetesToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ rastreador });
      comp.ngOnInit();

      expect(donacionesPaquetesService.query).toHaveBeenCalled();
      expect(donacionesPaquetesService.addDonacionesPaquetesToCollectionIfMissing).toHaveBeenCalledWith(
        donacionesPaquetesCollection,
        ...additionalDonacionesPaquetes
      );
      expect(comp.donacionesPaquetesSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const rastreador: IRastreador = { id: 456 };
      const idDonacionPaquete: IDonacionesPaquetes = { id: 74408 };
      rastreador.idDonacionPaquete = idDonacionPaquete;

      activatedRoute.data = of({ rastreador });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(rastreador));
      expect(comp.donacionesPaquetesSharedCollection).toContain(idDonacionPaquete);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Rastreador>>();
      const rastreador = { id: 123 };
      jest.spyOn(rastreadorService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ rastreador });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: rastreador }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(rastreadorService.update).toHaveBeenCalledWith(rastreador);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Rastreador>>();
      const rastreador = new Rastreador();
      jest.spyOn(rastreadorService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ rastreador });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: rastreador }));
      saveSubject.complete();

      // THEN
      expect(rastreadorService.create).toHaveBeenCalledWith(rastreador);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Rastreador>>();
      const rastreador = { id: 123 };
      jest.spyOn(rastreadorService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ rastreador });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(rastreadorService.update).toHaveBeenCalledWith(rastreador);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Tracking relationships identifiers', () => {
    describe('trackDonacionesPaquetesById', () => {
      it('Should return tracked DonacionesPaquetes primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackDonacionesPaquetesById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });
  });
});
