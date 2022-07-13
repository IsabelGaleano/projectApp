import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { InscripcionesService } from '../service/inscripciones.service';
import { IInscripciones, Inscripciones } from '../inscripciones.model';
import { IStartups } from 'app/entities/startups/startups.model';
import { StartupsService } from 'app/entities/startups/service/startups.service';

import { InscripcionesUpdateComponent } from './inscripciones-update.component';

describe('Inscripciones Management Update Component', () => {
  let comp: InscripcionesUpdateComponent;
  let fixture: ComponentFixture<InscripcionesUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let inscripcionesService: InscripcionesService;
  let startupsService: StartupsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [InscripcionesUpdateComponent],
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
      .overrideTemplate(InscripcionesUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(InscripcionesUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    inscripcionesService = TestBed.inject(InscripcionesService);
    startupsService = TestBed.inject(StartupsService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call idStartup query and add missing value', () => {
      const inscripciones: IInscripciones = { id: 456 };
      const idStartup: IStartups = { id: 29322 };
      inscripciones.idStartup = idStartup;

      const idStartupCollection: IStartups[] = [{ id: 45347 }];
      jest.spyOn(startupsService, 'query').mockReturnValue(of(new HttpResponse({ body: idStartupCollection })));
      const expectedCollection: IStartups[] = [idStartup, ...idStartupCollection];
      jest.spyOn(startupsService, 'addStartupsToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ inscripciones });
      comp.ngOnInit();

      expect(startupsService.query).toHaveBeenCalled();
      expect(startupsService.addStartupsToCollectionIfMissing).toHaveBeenCalledWith(idStartupCollection, idStartup);
      expect(comp.idStartupsCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const inscripciones: IInscripciones = { id: 456 };
      const idStartup: IStartups = { id: 13258 };
      inscripciones.idStartup = idStartup;

      activatedRoute.data = of({ inscripciones });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(inscripciones));
      expect(comp.idStartupsCollection).toContain(idStartup);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Inscripciones>>();
      const inscripciones = { id: 123 };
      jest.spyOn(inscripcionesService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ inscripciones });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: inscripciones }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(inscripcionesService.update).toHaveBeenCalledWith(inscripciones);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Inscripciones>>();
      const inscripciones = new Inscripciones();
      jest.spyOn(inscripcionesService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ inscripciones });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: inscripciones }));
      saveSubject.complete();

      // THEN
      expect(inscripcionesService.create).toHaveBeenCalledWith(inscripciones);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Inscripciones>>();
      const inscripciones = { id: 123 };
      jest.spyOn(inscripcionesService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ inscripciones });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(inscripcionesService.update).toHaveBeenCalledWith(inscripciones);
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
