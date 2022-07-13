import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { MonederosService } from '../service/monederos.service';
import { IMonederos, Monederos } from '../monederos.model';

import { MonederosUpdateComponent } from './monederos-update.component';

describe('Monederos Management Update Component', () => {
  let comp: MonederosUpdateComponent;
  let fixture: ComponentFixture<MonederosUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let monederosService: MonederosService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [MonederosUpdateComponent],
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
      .overrideTemplate(MonederosUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(MonederosUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    monederosService = TestBed.inject(MonederosService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const monederos: IMonederos = { id: 456 };

      activatedRoute.data = of({ monederos });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(monederos));
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Monederos>>();
      const monederos = { id: 123 };
      jest.spyOn(monederosService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ monederos });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: monederos }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(monederosService.update).toHaveBeenCalledWith(monederos);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Monederos>>();
      const monederos = new Monederos();
      jest.spyOn(monederosService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ monederos });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: monederos }));
      saveSubject.complete();

      // THEN
      expect(monederosService.create).toHaveBeenCalledWith(monederos);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Monederos>>();
      const monederos = { id: 123 };
      jest.spyOn(monederosService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ monederos });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(monederosService.update).toHaveBeenCalledWith(monederos);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
