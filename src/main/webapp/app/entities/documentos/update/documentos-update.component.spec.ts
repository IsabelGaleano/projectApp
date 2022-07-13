import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { DocumentosService } from '../service/documentos.service';
import { IDocumentos, Documentos } from '../documentos.model';
import { IStartups } from 'app/entities/startups/startups.model';
import { StartupsService } from 'app/entities/startups/service/startups.service';
import { IUsuarios } from 'app/entities/usuarios/usuarios.model';
import { UsuariosService } from 'app/entities/usuarios/service/usuarios.service';
import { IPaquetes } from 'app/entities/paquetes/paquetes.model';
import { PaquetesService } from 'app/entities/paquetes/service/paquetes.service';

import { DocumentosUpdateComponent } from './documentos-update.component';

describe('Documentos Management Update Component', () => {
  let comp: DocumentosUpdateComponent;
  let fixture: ComponentFixture<DocumentosUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let documentosService: DocumentosService;
  let startupsService: StartupsService;
  let usuariosService: UsuariosService;
  let paquetesService: PaquetesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [DocumentosUpdateComponent],
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
      .overrideTemplate(DocumentosUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(DocumentosUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    documentosService = TestBed.inject(DocumentosService);
    startupsService = TestBed.inject(StartupsService);
    usuariosService = TestBed.inject(UsuariosService);
    paquetesService = TestBed.inject(PaquetesService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Startups query and add missing value', () => {
      const documentos: IDocumentos = { id: 456 };
      const idStartup: IStartups = { id: 29699 };
      documentos.idStartup = idStartup;

      const startupsCollection: IStartups[] = [{ id: 10626 }];
      jest.spyOn(startupsService, 'query').mockReturnValue(of(new HttpResponse({ body: startupsCollection })));
      const additionalStartups = [idStartup];
      const expectedCollection: IStartups[] = [...additionalStartups, ...startupsCollection];
      jest.spyOn(startupsService, 'addStartupsToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ documentos });
      comp.ngOnInit();

      expect(startupsService.query).toHaveBeenCalled();
      expect(startupsService.addStartupsToCollectionIfMissing).toHaveBeenCalledWith(startupsCollection, ...additionalStartups);
      expect(comp.startupsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Usuarios query and add missing value', () => {
      const documentos: IDocumentos = { id: 456 };
      const idUsuario: IUsuarios = { id: 86905 };
      documentos.idUsuario = idUsuario;

      const usuariosCollection: IUsuarios[] = [{ id: 61901 }];
      jest.spyOn(usuariosService, 'query').mockReturnValue(of(new HttpResponse({ body: usuariosCollection })));
      const additionalUsuarios = [idUsuario];
      const expectedCollection: IUsuarios[] = [...additionalUsuarios, ...usuariosCollection];
      jest.spyOn(usuariosService, 'addUsuariosToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ documentos });
      comp.ngOnInit();

      expect(usuariosService.query).toHaveBeenCalled();
      expect(usuariosService.addUsuariosToCollectionIfMissing).toHaveBeenCalledWith(usuariosCollection, ...additionalUsuarios);
      expect(comp.usuariosSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Paquetes query and add missing value', () => {
      const documentos: IDocumentos = { id: 456 };
      const idPaquete: IPaquetes = { id: 88103 };
      documentos.idPaquete = idPaquete;

      const paquetesCollection: IPaquetes[] = [{ id: 88594 }];
      jest.spyOn(paquetesService, 'query').mockReturnValue(of(new HttpResponse({ body: paquetesCollection })));
      const additionalPaquetes = [idPaquete];
      const expectedCollection: IPaquetes[] = [...additionalPaquetes, ...paquetesCollection];
      jest.spyOn(paquetesService, 'addPaquetesToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ documentos });
      comp.ngOnInit();

      expect(paquetesService.query).toHaveBeenCalled();
      expect(paquetesService.addPaquetesToCollectionIfMissing).toHaveBeenCalledWith(paquetesCollection, ...additionalPaquetes);
      expect(comp.paquetesSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const documentos: IDocumentos = { id: 456 };
      const idStartup: IStartups = { id: 40758 };
      documentos.idStartup = idStartup;
      const idUsuario: IUsuarios = { id: 24359 };
      documentos.idUsuario = idUsuario;
      const idPaquete: IPaquetes = { id: 59840 };
      documentos.idPaquete = idPaquete;

      activatedRoute.data = of({ documentos });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(documentos));
      expect(comp.startupsSharedCollection).toContain(idStartup);
      expect(comp.usuariosSharedCollection).toContain(idUsuario);
      expect(comp.paquetesSharedCollection).toContain(idPaquete);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Documentos>>();
      const documentos = { id: 123 };
      jest.spyOn(documentosService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ documentos });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: documentos }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(documentosService.update).toHaveBeenCalledWith(documentos);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Documentos>>();
      const documentos = new Documentos();
      jest.spyOn(documentosService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ documentos });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: documentos }));
      saveSubject.complete();

      // THEN
      expect(documentosService.create).toHaveBeenCalledWith(documentos);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Documentos>>();
      const documentos = { id: 123 };
      jest.spyOn(documentosService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ documentos });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(documentosService.update).toHaveBeenCalledWith(documentos);
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
