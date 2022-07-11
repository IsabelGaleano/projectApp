import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { UsuariosService } from '../service/usuarios.service';
import { IUsuarios, Usuarios } from '../usuarios.model';
import { IMonederos } from 'app/entities/monederos/monederos.model';
import { MonederosService } from 'app/entities/monederos/service/monederos.service';
import { IRolesUsuarios } from 'app/entities/roles-usuarios/roles-usuarios.model';
import { RolesUsuariosService } from 'app/entities/roles-usuarios/service/roles-usuarios.service';

import { UsuariosUpdateComponent } from './usuarios-update.component';

describe('Usuarios Management Update Component', () => {
  let comp: UsuariosUpdateComponent;
  let fixture: ComponentFixture<UsuariosUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let usuariosService: UsuariosService;
  let monederosService: MonederosService;
  let rolesUsuariosService: RolesUsuariosService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [UsuariosUpdateComponent],
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
      .overrideTemplate(UsuariosUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(UsuariosUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    usuariosService = TestBed.inject(UsuariosService);
    monederosService = TestBed.inject(MonederosService);
    rolesUsuariosService = TestBed.inject(RolesUsuariosService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call idMonedero query and add missing value', () => {
      const usuarios: IUsuarios = { id: 456 };
      const idMonedero: IMonederos = { id: 5914 };
      usuarios.idMonedero = idMonedero;

      const idMonederoCollection: IMonederos[] = [{ id: 39638 }];
      jest.spyOn(monederosService, 'query').mockReturnValue(of(new HttpResponse({ body: idMonederoCollection })));
      const expectedCollection: IMonederos[] = [idMonedero, ...idMonederoCollection];
      jest.spyOn(monederosService, 'addMonederosToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ usuarios });
      comp.ngOnInit();

      expect(monederosService.query).toHaveBeenCalled();
      expect(monederosService.addMonederosToCollectionIfMissing).toHaveBeenCalledWith(idMonederoCollection, idMonedero);
      expect(comp.idMonederosCollection).toEqual(expectedCollection);
    });

    it('Should call RolesUsuarios query and add missing value', () => {
      const usuarios: IUsuarios = { id: 456 };
      const idRol: IRolesUsuarios = { id: 19366 };
      usuarios.idRol = idRol;

      const rolesUsuariosCollection: IRolesUsuarios[] = [{ id: 4588 }];
      jest.spyOn(rolesUsuariosService, 'query').mockReturnValue(of(new HttpResponse({ body: rolesUsuariosCollection })));
      const additionalRolesUsuarios = [idRol];
      const expectedCollection: IRolesUsuarios[] = [...additionalRolesUsuarios, ...rolesUsuariosCollection];
      jest.spyOn(rolesUsuariosService, 'addRolesUsuariosToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ usuarios });
      comp.ngOnInit();

      expect(rolesUsuariosService.query).toHaveBeenCalled();
      expect(rolesUsuariosService.addRolesUsuariosToCollectionIfMissing).toHaveBeenCalledWith(
        rolesUsuariosCollection,
        ...additionalRolesUsuarios
      );
      expect(comp.rolesUsuariosSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const usuarios: IUsuarios = { id: 456 };
      const idMonedero: IMonederos = { id: 88983 };
      usuarios.idMonedero = idMonedero;
      const idRol: IRolesUsuarios = { id: 89660 };
      usuarios.idRol = idRol;

      activatedRoute.data = of({ usuarios });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(usuarios));
      expect(comp.idMonederosCollection).toContain(idMonedero);
      expect(comp.rolesUsuariosSharedCollection).toContain(idRol);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Usuarios>>();
      const usuarios = { id: 123 };
      jest.spyOn(usuariosService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ usuarios });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: usuarios }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(usuariosService.update).toHaveBeenCalledWith(usuarios);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Usuarios>>();
      const usuarios = new Usuarios();
      jest.spyOn(usuariosService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ usuarios });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: usuarios }));
      saveSubject.complete();

      // THEN
      expect(usuariosService.create).toHaveBeenCalledWith(usuarios);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Usuarios>>();
      const usuarios = { id: 123 };
      jest.spyOn(usuariosService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ usuarios });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(usuariosService.update).toHaveBeenCalledWith(usuarios);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Tracking relationships identifiers', () => {
    describe('trackMonederosById', () => {
      it('Should return tracked Monederos primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackMonederosById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });

    describe('trackRolesUsuariosById', () => {
      it('Should return tracked RolesUsuarios primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackRolesUsuariosById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });
  });
});
