import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { VotosService } from '../service/votos.service';
import { IVotos, Votos } from '../votos.model';
import { IStartups } from 'app/entities/startups/startups.model';
import { StartupsService } from 'app/entities/startups/service/startups.service';
import { IUsuarios } from 'app/entities/usuarios/usuarios.model';
import { UsuariosService } from 'app/entities/usuarios/service/usuarios.service';

import { VotosUpdateComponent } from './votos-update.component';

describe('Votos Management Update Component', () => {
  let comp: VotosUpdateComponent;
  let fixture: ComponentFixture<VotosUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let votosService: VotosService;
  let startupsService: StartupsService;
  let usuariosService: UsuariosService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [VotosUpdateComponent],
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
      .overrideTemplate(VotosUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(VotosUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    votosService = TestBed.inject(VotosService);
    startupsService = TestBed.inject(StartupsService);
    usuariosService = TestBed.inject(UsuariosService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Startups query and add missing value', () => {
      const votos: IVotos = { id: 456 };
      const idStartup: IStartups = { id: 25617 };
      votos.idStartup = idStartup;

      const startupsCollection: IStartups[] = [{ id: 16171 }];
      jest.spyOn(startupsService, 'query').mockReturnValue(of(new HttpResponse({ body: startupsCollection })));
      const additionalStartups = [idStartup];
      const expectedCollection: IStartups[] = [...additionalStartups, ...startupsCollection];
      jest.spyOn(startupsService, 'addStartupsToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ votos });
      comp.ngOnInit();

      expect(startupsService.query).toHaveBeenCalled();
      expect(startupsService.addStartupsToCollectionIfMissing).toHaveBeenCalledWith(startupsCollection, ...additionalStartups);
      expect(comp.startupsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Usuarios query and add missing value', () => {
      const votos: IVotos = { id: 456 };
      const idUsuario: IUsuarios = { id: 66207 };
      votos.idUsuario = idUsuario;

      const usuariosCollection: IUsuarios[] = [{ id: 62943 }];
      jest.spyOn(usuariosService, 'query').mockReturnValue(of(new HttpResponse({ body: usuariosCollection })));
      const additionalUsuarios = [idUsuario];
      const expectedCollection: IUsuarios[] = [...additionalUsuarios, ...usuariosCollection];
      jest.spyOn(usuariosService, 'addUsuariosToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ votos });
      comp.ngOnInit();

      expect(usuariosService.query).toHaveBeenCalled();
      expect(usuariosService.addUsuariosToCollectionIfMissing).toHaveBeenCalledWith(usuariosCollection, ...additionalUsuarios);
      expect(comp.usuariosSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const votos: IVotos = { id: 456 };
      const idStartup: IStartups = { id: 8156 };
      votos.idStartup = idStartup;
      const idUsuario: IUsuarios = { id: 43036 };
      votos.idUsuario = idUsuario;

      activatedRoute.data = of({ votos });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(votos));
      expect(comp.startupsSharedCollection).toContain(idStartup);
      expect(comp.usuariosSharedCollection).toContain(idUsuario);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Votos>>();
      const votos = { id: 123 };
      jest.spyOn(votosService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ votos });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: votos }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(votosService.update).toHaveBeenCalledWith(votos);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Votos>>();
      const votos = new Votos();
      jest.spyOn(votosService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ votos });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: votos }));
      saveSubject.complete();

      // THEN
      expect(votosService.create).toHaveBeenCalledWith(votos);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Votos>>();
      const votos = { id: 123 };
      jest.spyOn(votosService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ votos });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(votosService.update).toHaveBeenCalledWith(votos);
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
