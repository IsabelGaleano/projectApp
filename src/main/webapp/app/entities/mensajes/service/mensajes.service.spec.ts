import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import dayjs from 'dayjs/esm';

import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IMensajes, Mensajes } from '../mensajes.model';

import { MensajesService } from './mensajes.service';

describe('Mensajes Service', () => {
  let service: MensajesService;
  let httpMock: HttpTestingController;
  let elemDefault: IMensajes;
  let expectedResult: IMensajes | IMensajes[] | boolean | null;
  let currentDate: dayjs.Dayjs;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(MensajesService);
    httpMock = TestBed.inject(HttpTestingController);
    currentDate = dayjs();

    elemDefault = {
      id: 0,
      mensaje: 'AAAAAAA',
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

    it('should create a Mensajes', () => {
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

      service.create(new Mensajes()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Mensajes', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          mensaje: 'BBBBBB',
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

    it('should partial update a Mensajes', () => {
      const patchObject = Object.assign(
        {
          fecha: currentDate.format(DATE_TIME_FORMAT),
          estado: 'BBBBBB',
        },
        new Mensajes()
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

    it('should return a list of Mensajes', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          mensaje: 'BBBBBB',
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

    it('should delete a Mensajes', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addMensajesToCollectionIfMissing', () => {
      it('should add a Mensajes to an empty array', () => {
        const mensajes: IMensajes = { id: 123 };
        expectedResult = service.addMensajesToCollectionIfMissing([], mensajes);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(mensajes);
      });

      it('should not add a Mensajes to an array that contains it', () => {
        const mensajes: IMensajes = { id: 123 };
        const mensajesCollection: IMensajes[] = [
          {
            ...mensajes,
          },
          { id: 456 },
        ];
        expectedResult = service.addMensajesToCollectionIfMissing(mensajesCollection, mensajes);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Mensajes to an array that doesn't contain it", () => {
        const mensajes: IMensajes = { id: 123 };
        const mensajesCollection: IMensajes[] = [{ id: 456 }];
        expectedResult = service.addMensajesToCollectionIfMissing(mensajesCollection, mensajes);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(mensajes);
      });

      it('should add only unique Mensajes to an array', () => {
        const mensajesArray: IMensajes[] = [{ id: 123 }, { id: 456 }, { id: 73930 }];
        const mensajesCollection: IMensajes[] = [{ id: 123 }];
        expectedResult = service.addMensajesToCollectionIfMissing(mensajesCollection, ...mensajesArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const mensajes: IMensajes = { id: 123 };
        const mensajes2: IMensajes = { id: 456 };
        expectedResult = service.addMensajesToCollectionIfMissing([], mensajes, mensajes2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(mensajes);
        expect(expectedResult).toContain(mensajes2);
      });

      it('should accept null and undefined values', () => {
        const mensajes: IMensajes = { id: 123 };
        expectedResult = service.addMensajesToCollectionIfMissing([], null, mensajes, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(mensajes);
      });

      it('should return initial array if no Mensajes is added', () => {
        const mensajesCollection: IMensajes[] = [{ id: 123 }];
        expectedResult = service.addMensajesToCollectionIfMissing(mensajesCollection, undefined, null);
        expect(expectedResult).toEqual(mensajesCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
