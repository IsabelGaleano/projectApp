import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import dayjs from 'dayjs/esm';

import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IInscripciones, Inscripciones } from '../inscripciones.model';

import { InscripcionesService } from './inscripciones.service';

describe('Inscripciones Service', () => {
  let service: InscripcionesService;
  let httpMock: HttpTestingController;
  let elemDefault: IInscripciones;
  let expectedResult: IInscripciones | IInscripciones[] | boolean | null;
  let currentDate: dayjs.Dayjs;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(InscripcionesService);
    httpMock = TestBed.inject(HttpTestingController);
    currentDate = dayjs();

    elemDefault = {
      id: 0,
      nombre: 'AAAAAAA',
      descripcion: 'AAAAAAA',
      monto: 0,
      tipo: 'AAAAAAA',
      fechaInicial: currentDate,
      fechaFinal: currentDate,
      beneficios: 'AAAAAAA',
      estado: 'AAAAAAA',
      numInscripcion: 0,
    };
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = Object.assign(
        {
          fechaInicial: currentDate.format(DATE_TIME_FORMAT),
          fechaFinal: currentDate.format(DATE_TIME_FORMAT),
        },
        elemDefault
      );

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(elemDefault);
    });

    it('should create a Inscripciones', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
          fechaInicial: currentDate.format(DATE_TIME_FORMAT),
          fechaFinal: currentDate.format(DATE_TIME_FORMAT),
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          fechaInicial: currentDate,
          fechaFinal: currentDate,
        },
        returnedFromService
      );

      service.create(new Inscripciones()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Inscripciones', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          nombre: 'BBBBBB',
          descripcion: 'BBBBBB',
          monto: 1,
          tipo: 'BBBBBB',
          fechaInicial: currentDate.format(DATE_TIME_FORMAT),
          fechaFinal: currentDate.format(DATE_TIME_FORMAT),
          beneficios: 'BBBBBB',
          estado: 'BBBBBB',
          numInscripcion: 1,
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          fechaInicial: currentDate,
          fechaFinal: currentDate,
        },
        returnedFromService
      );

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Inscripciones', () => {
      const patchObject = Object.assign(
        {
          fechaInicial: currentDate.format(DATE_TIME_FORMAT),
          beneficios: 'BBBBBB',
          estado: 'BBBBBB',
          numInscripcion: 1,
        },
        new Inscripciones()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign(
        {
          fechaInicial: currentDate,
          fechaFinal: currentDate,
        },
        returnedFromService
      );

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Inscripciones', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          nombre: 'BBBBBB',
          descripcion: 'BBBBBB',
          monto: 1,
          tipo: 'BBBBBB',
          fechaInicial: currentDate.format(DATE_TIME_FORMAT),
          fechaFinal: currentDate.format(DATE_TIME_FORMAT),
          beneficios: 'BBBBBB',
          estado: 'BBBBBB',
          numInscripcion: 1,
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          fechaInicial: currentDate,
          fechaFinal: currentDate,
        },
        returnedFromService
      );

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toContainEqual(expected);
    });

    it('should delete a Inscripciones', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addInscripcionesToCollectionIfMissing', () => {
      it('should add a Inscripciones to an empty array', () => {
        const inscripciones: IInscripciones = { id: 123 };
        expectedResult = service.addInscripcionesToCollectionIfMissing([], inscripciones);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(inscripciones);
      });

      it('should not add a Inscripciones to an array that contains it', () => {
        const inscripciones: IInscripciones = { id: 123 };
        const inscripcionesCollection: IInscripciones[] = [
          {
            ...inscripciones,
          },
          { id: 456 },
        ];
        expectedResult = service.addInscripcionesToCollectionIfMissing(inscripcionesCollection, inscripciones);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Inscripciones to an array that doesn't contain it", () => {
        const inscripciones: IInscripciones = { id: 123 };
        const inscripcionesCollection: IInscripciones[] = [{ id: 456 }];
        expectedResult = service.addInscripcionesToCollectionIfMissing(inscripcionesCollection, inscripciones);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(inscripciones);
      });

      it('should add only unique Inscripciones to an array', () => {
        const inscripcionesArray: IInscripciones[] = [{ id: 123 }, { id: 456 }, { id: 66343 }];
        const inscripcionesCollection: IInscripciones[] = [{ id: 123 }];
        expectedResult = service.addInscripcionesToCollectionIfMissing(inscripcionesCollection, ...inscripcionesArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const inscripciones: IInscripciones = { id: 123 };
        const inscripciones2: IInscripciones = { id: 456 };
        expectedResult = service.addInscripcionesToCollectionIfMissing([], inscripciones, inscripciones2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(inscripciones);
        expect(expectedResult).toContain(inscripciones2);
      });

      it('should accept null and undefined values', () => {
        const inscripciones: IInscripciones = { id: 123 };
        expectedResult = service.addInscripcionesToCollectionIfMissing([], null, inscripciones, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(inscripciones);
      });

      it('should return initial array if no Inscripciones is added', () => {
        const inscripcionesCollection: IInscripciones[] = [{ id: 123 }];
        expectedResult = service.addInscripcionesToCollectionIfMissing(inscripcionesCollection, undefined, null);
        expect(expectedResult).toEqual(inscripcionesCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
