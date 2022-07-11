import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { FacturasService } from '../service/facturas.service';
import { IFacturas, Facturas } from '../facturas.model';
import { IDonacionesPaquetes } from 'app/entities/donaciones-paquetes/donaciones-paquetes.model';
import { DonacionesPaquetesService } from 'app/entities/donaciones-paquetes/service/donaciones-paquetes.service';
import { IStartups } from 'app/entities/startups/startups.model';
import { StartupsService } from 'app/entities/startups/service/startups.service';
import { IUsuarios } from 'app/entities/usuarios/usuarios.model';
import { UsuariosService } from 'app/entities/usuarios/service/usuarios.service';

import { FacturasUpdateComponent } from './facturas-update.component';

describe('Facturas Management Update Component', () => {
  let comp: FacturasUpdateComponent;
  let fixture: ComponentFixture<FacturasUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let facturasService: FacturasService;
  let donacionesPaquetesService: DonacionesPaquetesService;
  let startupsService: StartupsService;
  let usuariosService: UsuariosService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [FacturasUpdateComponent],
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
      .overrideTemplate(FacturasUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(FacturasUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    facturasService = TestBed.inject(FacturasService);
    donacionesPaquetesService = TestBed.inject(DonacionesPaquetesService);
    startupsService = TestBed.inject(StartupsService);
    usuariosService = TestBed.inject(UsuariosService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call idDonacionPaquete query and add missing value', () => {
      const facturas: IFacturas = { id: 456 };
      const idDonacionPaquete: IDonacionesPaquetes = { id: 51876 };
      facturas.idDonacionPaquete = idDonacionPaquete;

      const idDonacionPaqueteCollection: IDonacionesPaquetes[] = [{ id: 51467 }];
      jest.spyOn(donacionesPaquetesService, 'query').mockReturnValue(of(new HttpResponse({ body: idDonacionPaqueteCollection })));
      const expectedCollection: IDonacionesPaquetes[] = [idDonacionPaquete, ...idDonacionPaqueteCollection];
      jest.spyOn(donacionesPaquetesService, 'addDonacionesPaquetesToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ facturas });
      comp.ngOnInit();

      expect(donacionesPaquetesService.query).toHaveBeenCalled();
      expect(donacionesPaquetesService.addDonacionesPaquetesToCollectionIfMissing).toHaveBeenCalledWith(
        idDonacionPaqueteCollection,
        idDonacionPaquete
      );
      expect(comp.idDonacionPaquetesCollection).toEqual(expectedCollection);
    });

    it('Should call Startups query and add missing value', () => {
      const facturas: IFacturas = { id: 456 };
      const idStartup: IStartups = { id: 9543 };
      facturas.idStartup = idStartup;

      const startupsCollection: IStartups[] = [{ id: 35230 }];
      jest.spyOn(startupsService, 'query').mockReturnValue(of(new HttpResponse({ body: startupsCollection })));
      const additionalStartups = [idStartup];
      const expectedCollection: IStartups[] = [...additionalStartups, ...startupsCollection];
      jest.spyOn(startupsService, 'addStartupsToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ facturas });
      comp.ngOnInit();

      expect(startupsService.query).toHaveBeenCalled();
      expect(startupsService.addStartupsToCollectionIfMissing).toHaveBeenCalledWith(startupsCollection, ...additionalStartups);
      expect(comp.startupsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Usuarios query and add missing value', () => {
      const facturas: IFacturas = { id: 456 };
      const idUsuario: IUsuarios = { id: 16796 };
      facturas.idUsuario = idUsuario;

      const usuariosCollection: IUsuarios[] = [{ id: 18815 }];
      jest.spyOn(usuariosService, 'query').mockReturnValue(of(new HttpResponse({ body: usuariosCollection })));
      const additionalUsuarios = [idUsuario];
      const expectedCollection: IUsuarios[] = [...additionalUsuarios, ...usuariosCollection];
      jest.spyOn(usuariosService, 'addUsuariosToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ facturas });
      comp.ngOnInit();

      expect(usuariosService.query).toHaveBeenCalled();
      expect(usuariosService.addUsuariosToCollectionIfMissing).toHaveBeenCalledWith(usuariosCollection, ...additionalUsuarios);
      expect(comp.usuariosSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const facturas: IFacturas = { id: 456 };
      const idDonacionPaquete: IDonacionesPaquetes = { id: 54038 };
      facturas.idDonacionPaquete = idDonacionPaquete;
      const idStartup: IStartups = { id: 81387 };
      facturas.idStartup = idStartup;
      const idUsuario: IUsuarios = { id: 3989 };
      facturas.idUsuario = idUsuario;

      activatedRoute.data = of({ facturas });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(facturas));
      expect(comp.idDonacionPaquetesCollection).toContain(idDonacionPaquete);
      expect(comp.startupsSharedCollection).toContain(idStartup);
      expect(comp.usuariosSharedCollection).toContain(idUsuario);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Facturas>>();
      const facturas = { id: 123 };
      jest.spyOn(facturasService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ facturas });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: facturas }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(facturasService.update).toHaveBeenCalledWith(facturas);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Facturas>>();
      const facturas = new Facturas();
      jest.spyOn(facturasService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ facturas });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: facturas }));
      saveSubject.complete();

      // THEN
      expect(facturasService.create).toHaveBeenCalledWith(facturas);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Facturas>>();
      const facturas = { id: 123 };
      jest.spyOn(facturasService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ facturas });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(facturasService.update).toHaveBeenCalledWith(facturas);
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
  });
});
