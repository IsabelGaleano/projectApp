import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { NotificacionesService } from '../service/notificaciones.service';
import { INotificaciones, Notificaciones } from '../notificaciones.model';
import { IStartups } from 'app/entities/startups/startups.model';
import { StartupsService } from 'app/entities/startups/service/startups.service';
import { IUsuarios } from 'app/entities/usuarios/usuarios.model';
import { UsuariosService } from 'app/entities/usuarios/service/usuarios.service';

import { NotificacionesUpdateComponent } from './notificaciones-update.component';

describe('Notificaciones Management Update Component', () => {
  let comp: NotificacionesUpdateComponent;
  let fixture: ComponentFixture<NotificacionesUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let notificacionesService: NotificacionesService;
  let startupsService: StartupsService;
  let usuariosService: UsuariosService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [NotificacionesUpdateComponent],
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
      .overrideTemplate(NotificacionesUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(NotificacionesUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    notificacionesService = TestBed.inject(NotificacionesService);
    startupsService = TestBed.inject(StartupsService);
    usuariosService = TestBed.inject(UsuariosService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Startups query and add missing value', () => {
      const notificaciones: INotificaciones = { id: 456 };
      const idStartup: IStartups = { id: 79916 };
      notificaciones.idStartup = idStartup;

      const startupsCollection: IStartups[] = [{ id: 36578 }];
      jest.spyOn(startupsService, 'query').mockReturnValue(of(new HttpResponse({ body: startupsCollection })));
      const additionalStartups = [idStartup];
      const expectedCollection: IStartups[] = [...additionalStartups, ...startupsCollection];
      jest.spyOn(startupsService, 'addStartupsToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ notificaciones });
      comp.ngOnInit();

      expect(startupsService.query).toHaveBeenCalled();
      expect(startupsService.addStartupsToCollectionIfMissing).toHaveBeenCalledWith(startupsCollection, ...additionalStartups);
      expect(comp.startupsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Usuarios query and add missing value', () => {
      const notificaciones: INotificaciones = { id: 456 };
      const idUsuario: IUsuarios = { id: 35296 };
      notificaciones.idUsuario = idUsuario;

      const usuariosCollection: IUsuarios[] = [{ id: 62965 }];
      jest.spyOn(usuariosService, 'query').mockReturnValue(of(new HttpResponse({ body: usuariosCollection })));
      const additionalUsuarios = [idUsuario];
      const expectedCollection: IUsuarios[] = [...additionalUsuarios, ...usuariosCollection];
      jest.spyOn(usuariosService, 'addUsuariosToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ notificaciones });
      comp.ngOnInit();

      expect(usuariosService.query).toHaveBeenCalled();
      expect(usuariosService.addUsuariosToCollectionIfMissing).toHaveBeenCalledWith(usuariosCollection, ...additionalUsuarios);
      expect(comp.usuariosSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const notificaciones: INotificaciones = { id: 456 };
      const idStartup: IStartups = { id: 66766 };
      notificaciones.idStartup = idStartup;
      const idUsuario: IUsuarios = { id: 78906 };
      notificaciones.idUsuario = idUsuario;

      activatedRoute.data = of({ notificaciones });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(notificaciones));
      expect(comp.startupsSharedCollection).toContain(idStartup);
      expect(comp.usuariosSharedCollection).toContain(idUsuario);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Notificaciones>>();
      const notificaciones = { id: 123 };
      jest.spyOn(notificacionesService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ notificaciones });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: notificaciones }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(notificacionesService.update).toHaveBeenCalledWith(notificaciones);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Notificaciones>>();
      const notificaciones = new Notificaciones();
      jest.spyOn(notificacionesService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ notificaciones });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: notificaciones }));
      saveSubject.complete();

      // THEN
      expect(notificacionesService.create).toHaveBeenCalledWith(notificaciones);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Notificaciones>>();
      const notificaciones = { id: 123 };
      jest.spyOn(notificacionesService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ notificaciones });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(notificacionesService.update).toHaveBeenCalledWith(notificaciones);
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
