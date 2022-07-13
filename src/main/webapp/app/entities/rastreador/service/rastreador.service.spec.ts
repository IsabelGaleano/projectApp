import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import dayjs from 'dayjs/esm';

import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IRastreador, Rastreador } from '../rastreador.model';

import { RastreadorService } from './rastreador.service';

describe('Rastreador Service', () => {
  let service: RastreadorService;
  let httpMock: HttpTestingController;
  let elemDefault: IRastreador;
  let expectedResult: IRastreador | IRastreador[] | boolean | null;
  let currentDate: dayjs.Dayjs;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(RastreadorService);
    httpMock = TestBed.inject(HttpTestingController);
    currentDate = dayjs();

    elemDefault = {
      id: 0,
      descripcion: 'AAAAAAA',
      latitud: 'AAAAAAA',
      longitud: 'AAAAAAA',
      fecha: currentDate,
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

    it('should create a Rastreador', () => {
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

      service.create(new Rastreador()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Rastreador', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          descripcion: 'BBBBBB',
          latitud: 'BBBBBB',
          longitud: 'BBBBBB',
          fecha: currentDate.format(DATE_TIME_FORMAT),
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

    it('should partial update a Rastreador', () => {
      const patchObject = Object.assign(
        {
          latitud: 'BBBBBB',
          fecha: currentDate.format(DATE_TIME_FORMAT),
        },
        new Rastreador()
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

    it('should return a list of Rastreador', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          descripcion: 'BBBBBB',
          latitud: 'BBBBBB',
          longitud: 'BBBBBB',
          fecha: currentDate.format(DATE_TIME_FORMAT),
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

    it('should delete a Rastreador', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addRastreadorToCollectionIfMissing', () => {
      it('should add a Rastreador to an empty array', () => {
        const rastreador: IRastreador = { id: 123 };
        expectedResult = service.addRastreadorToCollectionIfMissing([], rastreador);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(rastreador);
      });

      it('should not add a Rastreador to an array that contains it', () => {
        const rastreador: IRastreador = { id: 123 };
        const rastreadorCollection: IRastreador[] = [
          {
            ...rastreador,
          },
          { id: 456 },
        ];
        expectedResult = service.addRastreadorToCollectionIfMissing(rastreadorCollection, rastreador);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Rastreador to an array that doesn't contain it", () => {
        const rastreador: IRastreador = { id: 123 };
        const rastreadorCollection: IRastreador[] = [{ id: 456 }];
        expectedResult = service.addRastreadorToCollectionIfMissing(rastreadorCollection, rastreador);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(rastreador);
      });

      it('should add only unique Rastreador to an array', () => {
        const rastreadorArray: IRastreador[] = [{ id: 123 }, { id: 456 }, { id: 57432 }];
        const rastreadorCollection: IRastreador[] = [{ id: 123 }];
        expectedResult = service.addRastreadorToCollectionIfMissing(rastreadorCollection, ...rastreadorArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const rastreador: IRastreador = { id: 123 };
        const rastreador2: IRastreador = { id: 456 };
        expectedResult = service.addRastreadorToCollectionIfMissing([], rastreador, rastreador2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(rastreador);
        expect(expectedResult).toContain(rastreador2);
      });

      it('should accept null and undefined values', () => {
        const rastreador: IRastreador = { id: 123 };
        expectedResult = service.addRastreadorToCollectionIfMissing([], null, rastreador, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(rastreador);
      });

      it('should return initial array if no Rastreador is added', () => {
        const rastreadorCollection: IRastreador[] = [{ id: 123 }];
        expectedResult = service.addRastreadorToCollectionIfMissing(rastreadorCollection, undefined, null);
        expect(expectedResult).toEqual(rastreadorCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
