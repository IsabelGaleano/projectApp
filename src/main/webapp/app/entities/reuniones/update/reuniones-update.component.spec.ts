import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { ReunionesService } from '../service/reuniones.service';
import { IReuniones, Reuniones } from '../reuniones.model';
import { IStartups } from 'app/entities/startups/startups.model';
import { StartupsService } from 'app/entities/startups/service/startups.service';
import { IUsuarios } from 'app/entities/usuarios/usuarios.model';
import { UsuariosService } from 'app/entities/usuarios/service/usuarios.service';

import { ReunionesUpdateComponent } from './reuniones-update.component';

describe('Reuniones Management Update Component', () => {
  let comp: ReunionesUpdateComponent;
  let fixture: ComponentFixture<ReunionesUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let reunionesService: ReunionesService;
  let startupsService: StartupsService;
  let usuariosService: UsuariosService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [ReunionesUpdateComponent],
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
      .overrideTemplate(ReunionesUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ReunionesUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    reunionesService = TestBed.inject(ReunionesService);
    startupsService = TestBed.inject(StartupsService);
    usuariosService = TestBed.inject(UsuariosService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Startups query and add missing value', () => {
      const reuniones: IReuniones = { id: 456 };
      const idStartup: IStartups = { id: 68772 };
      reuniones.idStartup = idStartup;

      const startupsCollection: IStartups[] = [{ id: 1116 }];
      jest.spyOn(startupsService, 'query').mockReturnValue(of(new HttpResponse({ body: startupsCollection })));
      const additionalStartups = [idStartup];
      const expectedCollection: IStartups[] = [...additionalStartups, ...startupsCollection];
      jest.spyOn(startupsService, 'addStartupsToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ reuniones });
      comp.ngOnInit();

      expect(startupsService.query).toHaveBeenCalled();
      expect(startupsService.addStartupsToCollectionIfMissing).toHaveBeenCalledWith(startupsCollection, ...additionalStartups);
      expect(comp.startupsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Usuarios query and add missing value', () => {
      const reuniones: IReuniones = { id: 456 };
      const idUsuario: IUsuarios = { id: 21369 };
      reuniones.idUsuario = idUsuario;

      const usuariosCollection: IUsuarios[] = [{ id: 78099 }];
      jest.spyOn(usuariosService, 'query').mockReturnValue(of(new HttpResponse({ body: usuariosCollection })));
      const additionalUsuarios = [idUsuario];
      const expectedCollection: IUsuarios[] = [...additionalUsuarios, ...usuariosCollection];
      jest.spyOn(usuariosService, 'addUsuariosToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ reuniones });
      comp.ngOnInit();

      expect(usuariosService.query).toHaveBeenCalled();
      expect(usuariosService.addUsuariosToCollectionIfMissing).toHaveBeenCalledWith(usuariosCollection, ...additionalUsuarios);
      expect(comp.usuariosSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const reuniones: IReuniones = { id: 456 };
      const idStartup: IStartups = { id: 41517 };
      reuniones.idStartup = idStartup;
      const idUsuario: IUsuarios = { id: 88830 };
      reuniones.idUsuario = idUsuario;

      activatedRoute.data = of({ reuniones });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(reuniones));
      expect(comp.startupsSharedCollection).toContain(idStartup);
      expect(comp.usuariosSharedCollection).toContain(idUsuario);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Reuniones>>();
      const reuniones = { id: 123 };
      jest.spyOn(reunionesService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ reuniones });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: reuniones }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(reunionesService.update).toHaveBeenCalledWith(reuniones);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Reuniones>>();
      const reuniones = new Reuniones();
      jest.spyOn(reunionesService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ reuniones });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: reuniones }));
      saveSubject.complete();

      // THEN
      expect(reunionesService.create).toHaveBeenCalledWith(reuniones);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Reuniones>>();
      const reuniones = { id: 123 };
      jest.spyOn(reunionesService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ reuniones });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(reunionesService.update).toHaveBeenCalledWith(reuniones);
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
  });
});
