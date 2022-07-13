import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import dayjs from 'dayjs/esm';

import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IMovimientos, Movimientos } from '../movimientos.model';

import { MovimientosService } from './movimientos.service';

describe('Movimientos Service', () => {
  let service: MovimientosService;
  let httpMock: HttpTestingController;
  let elemDefault: IMovimientos;
  let expectedResult: IMovimientos | IMovimientos[] | boolean | null;
  let currentDate: dayjs.Dayjs;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(MovimientosService);
    httpMock = TestBed.inject(HttpTestingController);
    currentDate = dayjs();

    elemDefault = {
      id: 0,
      fecha: currentDate,
      monto: 0,
      tipo: 'AAAAAAA',
      descripcion: 'AAAAAAA',
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

    it('should create a Movimientos', () => {
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

      service.create(new Movimientos()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Movimientos', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          fecha: currentDate.format(DATE_TIME_FORMAT),
          monto: 1,
          tipo: 'BBBBBB',
          descripcion: 'BBBBBB',
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

    it('should partial update a Movimientos', () => {
      const patchObject = Object.assign(
        {
          monto: 1,
        },
        new Movimientos()
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

    it('should return a list of Movimientos', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          fecha: currentDate.format(DATE_TIME_FORMAT),
          monto: 1,
          tipo: 'BBBBBB',
          descripcion: 'BBBBBB',
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

    it('should delete a Movimientos', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addMovimientosToCollectionIfMissing', () => {
      it('should add a Movimientos to an empty array', () => {
        const movimientos: IMovimientos = { id: 123 };
        expectedResult = service.addMovimientosToCollectionIfMissing([], movimientos);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(movimientos);
      });

      it('should not add a Movimientos to an array that contains it', () => {
        const movimientos: IMovimientos = { id: 123 };
        const movimientosCollection: IMovimientos[] = [
          {
            ...movimientos,
          },
          { id: 456 },
        ];
        expectedResult = service.addMovimientosToCollectionIfMissing(movimientosCollection, movimientos);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Movimientos to an array that doesn't contain it", () => {
        const movimientos: IMovimientos = { id: 123 };
        const movimientosCollection: IMovimientos[] = [{ id: 456 }];
        expectedResult = service.addMovimientosToCollectionIfMissing(movimientosCollection, movimientos);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(movimientos);
      });

      it('should add only unique Movimientos to an array', () => {
        const movimientosArray: IMovimientos[] = [{ id: 123 }, { id: 456 }, { id: 21270 }];
        const movimientosCollection: IMovimientos[] = [{ id: 123 }];
        expectedResult = service.addMovimientosToCollectionIfMissing(movimientosCollection, ...movimientosArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const movimientos: IMovimientos = { id: 123 };
        const movimientos2: IMovimientos = { id: 456 };
        expectedResult = service.addMovimientosToCollectionIfMissing([], movimientos, movimientos2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(movimientos);
        expect(expectedResult).toContain(movimientos2);
      });

      it('should accept null and undefined values', () => {
        const movimientos: IMovimientos = { id: 123 };
        expectedResult = service.addMovimientosToCollectionIfMissing([], null, movimientos, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(movimientos);
      });

      it('should return initial array if no Movimientos is added', () => {
        const movimientosCollection: IMovimientos[] = [{ id: 123 }];
        expectedResult = service.addMovimientosToCollectionIfMissing(movimientosCollection, undefined, null);
        expect(expectedResult).toEqual(movimientosCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
