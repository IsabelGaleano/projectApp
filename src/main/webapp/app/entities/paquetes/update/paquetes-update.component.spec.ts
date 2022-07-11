import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { PaquetesService } from '../service/paquetes.service';
import { IPaquetes, Paquetes } from '../paquetes.model';
import { IStartups } from 'app/entities/startups/startups.model';
import { StartupsService } from 'app/entities/startups/service/startups.service';

import { PaquetesUpdateComponent } from './paquetes-update.component';

describe('Paquetes Management Update Component', () => {
  let comp: PaquetesUpdateComponent;
  let fixture: ComponentFixture<PaquetesUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let paquetesService: PaquetesService;
  let startupsService: StartupsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [PaquetesUpdateComponent],
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
      .overrideTemplate(PaquetesUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(PaquetesUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    paquetesService = TestBed.inject(PaquetesService);
    startupsService = TestBed.inject(StartupsService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Startups query and add missing value', () => {
      const paquetes: IPaquetes = { id: 456 };
      const idStartup: IStartups = { id: 57167 };
      paquetes.idStartup = idStartup;

      const startupsCollection: IStartups[] = [{ id: 97021 }];
      jest.spyOn(startupsService, 'query').mockReturnValue(of(new HttpResponse({ body: startupsCollection })));
      const additionalStartups = [idStartup];
      const expectedCollection: IStartups[] = [...additionalStartups, ...startupsCollection];
      jest.spyOn(startupsService, 'addStartupsToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ paquetes });
      comp.ngOnInit();

      expect(startupsService.query).toHaveBeenCalled();
      expect(startupsService.addStartupsToCollectionIfMissing).toHaveBeenCalledWith(startupsCollection, ...additionalStartups);
      expect(comp.startupsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const paquetes: IPaquetes = { id: 456 };
      const idStartup: IStartups = { id: 26572 };
      paquetes.idStartup = idStartup;

      activatedRoute.data = of({ paquetes });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(paquetes));
      expect(comp.startupsSharedCollection).toContain(idStartup);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Paquetes>>();
      const paquetes = { id: 123 };
      jest.spyOn(paquetesService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ paquetes });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: paquetes }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(paquetesService.update).toHaveBeenCalledWith(paquetes);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Paquetes>>();
      const paquetes = new Paquetes();
      jest.spyOn(paquetesService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ paquetes });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: paquetes }));
      saveSubject.complete();

      // THEN
      expect(paquetesService.create).toHaveBeenCalledWith(paquetes);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Paquetes>>();
      const paquetes = { id: 123 };
      jest.spyOn(paquetesService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ paquetes });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(paquetesService.update).toHaveBeenCalledWith(paquetes);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Tracking relationships identifiers', () => {
    describe('trackStartupsById', () => {
      it('Should return tracked Startups primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackStartupsById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });
  });
});
