import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { PlanesInversionService } from '../service/planes-inversion.service';
import { IPlanesInversion, PlanesInversion } from '../planes-inversion.model';
import { IStartups } from 'app/entities/startups/startups.model';
import { StartupsService } from 'app/entities/startups/service/startups.service';

import { PlanesInversionUpdateComponent } from './planes-inversion-update.component';

describe('PlanesInversion Management Update Component', () => {
  let comp: PlanesInversionUpdateComponent;
  let fixture: ComponentFixture<PlanesInversionUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let planesInversionService: PlanesInversionService;
  let startupsService: StartupsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [PlanesInversionUpdateComponent],
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
      .overrideTemplate(PlanesInversionUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(PlanesInversionUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    planesInversionService = TestBed.inject(PlanesInversionService);
    startupsService = TestBed.inject(StartupsService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Startups query and add missing value', () => {
      const planesInversion: IPlanesInversion = { id: 456 };
      const idStartup: IStartups = { id: 94061 };
      planesInversion.idStartup = idStartup;

      const startupsCollection: IStartups[] = [{ id: 99157 }];
      jest.spyOn(startupsService, 'query').mockReturnValue(of(new HttpResponse({ body: startupsCollection })));
      const additionalStartups = [idStartup];
      const expectedCollection: IStartups[] = [...additionalStartups, ...startupsCollection];
      jest.spyOn(startupsService, 'addStartupsToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ planesInversion });
      comp.ngOnInit();

      expect(startupsService.query).toHaveBeenCalled();
      expect(startupsService.addStartupsToCollectionIfMissing).toHaveBeenCalledWith(startupsCollection, ...additionalStartups);
      expect(comp.startupsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const planesInversion: IPlanesInversion = { id: 456 };
      const idStartup: IStartups = { id: 22084 };
      planesInversion.idStartup = idStartup;

      activatedRoute.data = of({ planesInversion });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(planesInversion));
      expect(comp.startupsSharedCollection).toContain(idStartup);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<PlanesInversion>>();
      const planesInversion = { id: 123 };
      jest.spyOn(planesInversionService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ planesInversion });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: planesInversion }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(planesInversionService.update).toHaveBeenCalledWith(planesInversion);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<PlanesInversion>>();
      const planesInversion = new PlanesInversion();
      jest.spyOn(planesInversionService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ planesInversion });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: planesInversion }));
      saveSubject.complete();

      // THEN
      expect(planesInversionService.create).toHaveBeenCalledWith(planesInversion);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<PlanesInversion>>();
      const planesInversion = { id: 123 };
      jest.spyOn(planesInversionService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ planesInversion });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(planesInversionService.update).toHaveBeenCalledWith(planesInversion);
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
