import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import dayjs from 'dayjs/esm';

import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { INotificaciones, Notificaciones } from '../notificaciones.model';

import { NotificacionesService } from './notificaciones.service';

describe('Notificaciones Service', () => {
  let service: NotificacionesService;
  let httpMock: HttpTestingController;
  let elemDefault: INotificaciones;
  let expectedResult: INotificaciones | INotificaciones[] | boolean | null;
  let currentDate: dayjs.Dayjs;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(NotificacionesService);
    httpMock = TestBed.inject(HttpTestingController);
    currentDate = dayjs();

    elemDefault = {
      id: 0,
      tipo: 'AAAAAAA',
      descripcion: 'AAAAAAA',
      fecha: currentDate,
      tipoRemitente: 'AAAAAAA',
      tipoReceptor: 'AAAAAAA',
      estado: 'AAAAAAA',
    };
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = Object.assign(
        {
          fecha: currentDate.format(DATE_TIME_FORMAT),
        },
        elemDefault
      );

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(elemDefault);
    });

    it('should create a Notificaciones', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
          fecha: currentDate.format(DATE_TIME_FORMAT),
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          fecha: currentDate,
        },
        returnedFromService
      );

      service.create(new Notificaciones()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Notificaciones', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          tipo: 'BBBBBB',
          descripcion: 'BBBBBB',
          fecha: currentDate.format(DATE_TIME_FORMAT),
          tipoRemitente: 'BBBBBB',
          tipoReceptor: 'BBBBBB',
          estado: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          fecha: currentDate,
        },
        returnedFromService
      );

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Notificaciones', () => {
      const patchObject = Object.assign(
        {
          descripcion: 'BBBBBB',
          fecha: currentDate.format(DATE_TIME_FORMAT),
          tipoReceptor: 'BBBBBB',
          estado: 'BBBBBB',
        },
        new Notificaciones()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign(
        {
          fecha: currentDate,
        },
        returnedFromService
      );

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Notificaciones', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          tipo: 'BBBBBB',
          descripcion: 'BBBBBB',
          fecha: currentDate.format(DATE_TIME_FORMAT),
          tipoRemitente: 'BBBBBB',
          tipoReceptor: 'BBBBBB',
          estado: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          fecha: currentDate,
        },
        returnedFromService
      );

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toContainEqual(expected);
    });

    it('should delete a Notificaciones', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addNotificacionesToCollectionIfMissing', () => {
      it('should add a Notificaciones to an empty array', () => {
        const notificaciones: INotificaciones = { id: 123 };
        expectedResult = service.addNotificacionesToCollectionIfMissing([], notificaciones);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(notificaciones);
      });

      it('should not add a Notificaciones to an array that contains it', () => {
        const notificaciones: INotificaciones = { id: 123 };
        const notificacionesCollection: INotificaciones[] = [
          {
            ...notificaciones,
          },
          { id: 456 },
        ];
        expectedResult = service.addNotificacionesToCollectionIfMissing(notificacionesCollection, notificaciones);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Notificaciones to an array that doesn't contain it", () => {
        const notificaciones: INotificaciones = { id: 123 };
        const notificacionesCollection: INotificaciones[] = [{ id: 456 }];
        expectedResult = service.addNotificacionesToCollectionIfMissing(notificacionesCollection, notificaciones);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(notificaciones);
      });

      it('should add only unique Notificaciones to an array', () => {
        const notificacionesArray: INotificaciones[] = [{ id: 123 }, { id: 456 }, { id: 73806 }];
        const notificacionesCollection: INotificaciones[] = [{ id: 123 }];
        expectedResult = service.addNotificacionesToCollectionIfMissing(notificacionesCollection, ...notificacionesArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const notificaciones: INotificaciones = { id: 123 };
        const notificaciones2: INotificaciones = { id: 456 };
        expectedResult = service.addNotificacionesToCollectionIfMissing([], notificaciones, notificaciones2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(notificaciones);
        expect(expectedResult).toContain(notificaciones2);
      });

      it('should accept null and undefined values', () => {
        const notificaciones: INotificaciones = { id: 123 };
        expectedResult = service.addNotificacionesToCollectionIfMissing([], null, notificaciones, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(notificaciones);
      });

      it('should return initial array if no Notificaciones is added', () => {
        const notificacionesCollection: INotificaciones[] = [{ id: 123 }];
        expectedResult = service.addNotificacionesToCollectionIfMissing(notificacionesCollection, undefined, null);
        expect(expectedResult).toEqual(notificacionesCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
