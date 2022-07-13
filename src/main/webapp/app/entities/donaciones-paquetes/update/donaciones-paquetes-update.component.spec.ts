import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { DonacionesPaquetesService } from '../service/donaciones-paquetes.service';
import { IDonacionesPaquetes, DonacionesPaquetes } from '../donaciones-paquetes.model';
import { IStartups } from 'app/entities/startups/startups.model';
import { StartupsService } from 'app/entities/startups/service/startups.service';
import { IUsuarios } from 'app/entities/usuarios/usuarios.model';
import { UsuariosService } from 'app/entities/usuarios/service/usuarios.service';
import { IPaquetes } from 'app/entities/paquetes/paquetes.model';
import { PaquetesService } from 'app/entities/paquetes/service/paquetes.service';

import { DonacionesPaquetesUpdateComponent } from './donaciones-paquetes-update.component';

describe('DonacionesPaquetes Management Update Component', () => {
  let comp: DonacionesPaquetesUpdateComponent;
  let fixture: ComponentFixture<DonacionesPaquetesUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let donacionesPaquetesService: DonacionesPaquetesService;
  let startupsService: StartupsService;
  let usuariosService: UsuariosService;
  let paquetesService: PaquetesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [DonacionesPaquetesUpdateComponent],
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
      .overrideTemplate(DonacionesPaquetesUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(DonacionesPaquetesUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    donacionesPaquetesService = TestBed.inject(DonacionesPaquetesService);
    startupsService = TestBed.inject(StartupsService);
    usuariosService = TestBed.inject(UsuariosService);
    paquetesService = TestBed.inject(PaquetesService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Startups query and add missing value', () => {
      const donacionesPaquetes: IDonacionesPaquetes = { id: 456 };
      const idStartup: IStartups = { id: 92727 };
      donacionesPaquetes.idStartup = idStartup;

      const startupsCollection: IStartups[] = [{ id: 11167 }];
      jest.spyOn(startupsService, 'query').mockReturnValue(of(new HttpResponse({ body: startupsCollection })));
      const additionalStartups = [idStartup];
      const expectedCollection: IStartups[] = [...additionalStartups, ...startupsCollection];
      jest.spyOn(startupsService, 'addStartupsToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ donacionesPaquetes });
      comp.ngOnInit();

      expect(startupsService.query).toHaveBeenCalled();
      expect(startupsService.addStartupsToCollectionIfMissing).toHaveBeenCalledWith(startupsCollection, ...additionalStartups);
      expect(comp.startupsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Usuarios query and add missing value', () => {
      const donacionesPaquetes: IDonacionesPaquetes = { id: 456 };
      const idUsuario: IUsuarios = { id: 30070 };
      donacionesPaquetes.idUsuario = idUsuario;

      const usuariosCollection: IUsuarios[] = [{ id: 14097 }];
      jest.spyOn(usuariosService, 'query').mockReturnValue(of(new HttpResponse({ body: usuariosCollection })));
      const additionalUsuarios = [idUsuario];
      const expectedCollection: IUsuarios[] = [...additionalUsuarios, ...usuariosCollection];
      jest.spyOn(usuariosService, 'addUsuariosToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ donacionesPaquetes });
      comp.ngOnInit();

      expect(usuariosService.query).toHaveBeenCalled();
      expect(usuariosService.addUsuariosToCollectionIfMissing).toHaveBeenCalledWith(usuariosCollection, ...additionalUsuarios);
      expect(comp.usuariosSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Paquetes query and add missing value', () => {
      const donacionesPaquetes: IDonacionesPaquetes = { id: 456 };
      const idPaquete: IPaquetes = { id: 49915 };
      donacionesPaquetes.idPaquete = idPaquete;

      const paquetesCollection: IPaquetes[] = [{ id: 22773 }];
      jest.spyOn(paquetesService, 'query').mockReturnValue(of(new HttpResponse({ body: paquetesCollection })));
      const additionalPaquetes = [idPaquete];
      const expectedCollection: IPaquetes[] = [...additionalPaquetes, ...paquetesCollection];
      jest.spyOn(paquetesService, 'addPaquetesToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ donacionesPaquetes });
      comp.ngOnInit();

      expect(paquetesService.query).toHaveBeenCalled();
      expect(paquetesService.addPaquetesToCollectionIfMissing).toHaveBeenCalledWith(paquetesCollection, ...additionalPaquetes);
      expect(comp.paquetesSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const donacionesPaquetes: IDonacionesPaquetes = { id: 456 };
      const idStartup: IStartups = { id: 22707 };
      donacionesPaquetes.idStartup = idStartup;
      const idUsuario: IUsuarios = { id: 56571 };
      donacionesPaquetes.idUsuario = idUsuario;
      const idPaquete: IPaquetes = { id: 39478 };
      donacionesPaquetes.idPaquete = idPaquete;

      activatedRoute.data = of({ donacionesPaquetes });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(donacionesPaquetes));
      expect(comp.startupsSharedCollection).toContain(idStartup);
      expect(comp.usuariosSharedCollection).toContain(idUsuario);
      expect(comp.paquetesSharedCollection).toContain(idPaquete);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<DonacionesPaquetes>>();
      const donacionesPaquetes = { id: 123 };
      jest.spyOn(donacionesPaquetesService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ donacionesPaquetes });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: donacionesPaquetes }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(donacionesPaquetesService.update).toHaveBeenCalledWith(donacionesPaquetes);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<DonacionesPaquetes>>();
      const donacionesPaquetes = new DonacionesPaquetes();
      jest.spyOn(donacionesPaquetesService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ donacionesPaquetes });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: donacionesPaquetes }));
      saveSubject.complete();

      // THEN
      expect(donacionesPaquetesService.create).toHaveBeenCalledWith(donacionesPaquetes);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<DonacionesPaquetes>>();
      const donacionesPaquetes = { id: 123 };
      jest.spyOn(donacionesPaquetesService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ donacionesPaquetes });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(donacionesPaquetesService.update).toHaveBeenCalledWith(donacionesPaquetes);
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

    describe('trackUsuariosById', () => {
      it('Should return tracked Usuarios primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackUsuariosById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });

    describe('trackPaquetesById', () => {
      it('Should return tracked Paquetes primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackPaquetesById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });
  });
});
