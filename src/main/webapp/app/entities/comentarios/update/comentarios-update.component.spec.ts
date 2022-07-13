import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { ComentariosService } from '../service/comentarios.service';
import { IComentarios, Comentarios } from '../comentarios.model';
import { IStartups } from 'app/entities/startups/startups.model';
import { StartupsService } from 'app/entities/startups/service/startups.service';
import { IUsuarios } from 'app/entities/usuarios/usuarios.model';
import { UsuariosService } from 'app/entities/usuarios/service/usuarios.service';

import { ComentariosUpdateComponent } from './comentarios-update.component';

describe('Comentarios Management Update Component', () => {
  let comp: ComentariosUpdateComponent;
  let fixture: ComponentFixture<ComentariosUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let comentariosService: ComentariosService;
  let startupsService: StartupsService;
  let usuariosService: UsuariosService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [ComentariosUpdateComponent],
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
      .overrideTemplate(ComentariosUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ComentariosUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    comentariosService = TestBed.inject(ComentariosService);
    startupsService = TestBed.inject(StartupsService);
    usuariosService = TestBed.inject(UsuariosService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Startups query and add missing value', () => {
      const comentarios: IComentarios = { id: 456 };
      const idStartup: IStartups = { id: 88130 };
      comentarios.idStartup = idStartup;

      const startupsCollection: IStartups[] = [{ id: 90454 }];
      jest.spyOn(startupsService, 'query').mockReturnValue(of(new HttpResponse({ body: startupsCollection })));
      const additionalStartups = [idStartup];
      const expectedCollection: IStartups[] = [...additionalStartups, ...startupsCollection];
      jest.spyOn(startupsService, 'addStartupsToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ comentarios });
      comp.ngOnInit();

      expect(startupsService.query).toHaveBeenCalled();
      expect(startupsService.addStartupsToCollectionIfMissing).toHaveBeenCalledWith(startupsCollection, ...additionalStartups);
      expect(comp.startupsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Usuarios query and add missing value', () => {
      const comentarios: IComentarios = { id: 456 };
      const idUsuario: IUsuarios = { id: 33009 };
      comentarios.idUsuario = idUsuario;

      const usuariosCollection: IUsuarios[] = [{ id: 76202 }];
      jest.spyOn(usuariosService, 'query').mockReturnValue(of(new HttpResponse({ body: usuariosCollection })));
      const additionalUsuarios = [idUsuario];
      const expectedCollection: IUsuarios[] = [...additionalUsuarios, ...usuariosCollection];
      jest.spyOn(usuariosService, 'addUsuariosToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ comentarios });
      comp.ngOnInit();

      expect(usuariosService.query).toHaveBeenCalled();
      expect(usuariosService.addUsuariosToCollectionIfMissing).toHaveBeenCalledWith(usuariosCollection, ...additionalUsuarios);
      expect(comp.usuariosSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const comentarios: IComentarios = { id: 456 };
      const idStartup: IStartups = { id: 92197 };
      comentarios.idStartup = idStartup;
      const idUsuario: IUsuarios = { id: 9475 };
      comentarios.idUsuario = idUsuario;

      activatedRoute.data = of({ comentarios });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(comentarios));
      expect(comp.startupsSharedCollection).toContain(idStartup);
      expect(comp.usuariosSharedCollection).toContain(idUsuario);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Comentarios>>();
      const comentarios = { id: 123 };
      jest.spyOn(comentariosService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ comentarios });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: comentarios }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(comentariosService.update).toHaveBeenCalledWith(comentarios);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Comentarios>>();
      const comentarios = new Comentarios();
      jest.spyOn(comentariosService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ comentarios });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: comentarios }));
      saveSubject.complete();

      // THEN
      expect(comentariosService.create).toHaveBeenCalledWith(comentarios);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Comentarios>>();
      const comentarios = { id: 123 };
      jest.spyOn(comentariosService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ comentarios });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(comentariosService.update).toHaveBeenCalledWith(comentarios);
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
