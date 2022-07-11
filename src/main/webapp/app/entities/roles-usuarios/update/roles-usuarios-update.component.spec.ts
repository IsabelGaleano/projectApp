import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { RolesUsuariosService } from '../service/roles-usuarios.service';
import { IRolesUsuarios, RolesUsuarios } from '../roles-usuarios.model';

import { RolesUsuariosUpdateComponent } from './roles-usuarios-update.component';

describe('RolesUsuarios Management Update Component', () => {
  let comp: RolesUsuariosUpdateComponent;
  let fixture: ComponentFixture<RolesUsuariosUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let rolesUsuariosService: RolesUsuariosService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [RolesUsuariosUpdateComponent],
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
      .overrideTemplate(RolesUsuariosUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(RolesUsuariosUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    rolesUsuariosService = TestBed.inject(RolesUsuariosService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const rolesUsuarios: IRolesUsuarios = { id: 456 };

      activatedRoute.data = of({ rolesUsuarios });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(rolesUsuarios));
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<RolesUsuarios>>();
      const rolesUsuarios = { id: 123 };
      jest.spyOn(rolesUsuariosService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ rolesUsuarios });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: rolesUsuarios }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(rolesUsuariosService.update).toHaveBeenCalledWith(rolesUsuarios);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<RolesUsuarios>>();
      const rolesUsuarios = new RolesUsuarios();
      jest.spyOn(rolesUsuariosService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ rolesUsuarios });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: rolesUsuarios }));
      saveSubject.complete();

      // THEN
      expect(rolesUsuariosService.create).toHaveBeenCalledWith(rolesUsuarios);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<RolesUsuarios>>();
      const rolesUsuarios = { id: 123 };
      jest.spyOn(rolesUsuariosService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ rolesUsuarios });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(rolesUsuariosService.update).toHaveBeenCalledWith(rolesUsuarios);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
