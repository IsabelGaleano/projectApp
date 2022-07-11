import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import dayjs from 'dayjs/esm';

import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IFacturas, Facturas } from '../facturas.model';

import { FacturasService } from './facturas.service';

describe('Facturas Service', () => {
  let service: FacturasService;
  let httpMock: HttpTestingController;
  let elemDefault: IFacturas;
  let expectedResult: IFacturas | IFacturas[] | boolean | null;
  let currentDate: dayjs.Dayjs;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(FacturasService);
    httpMock = TestBed.inject(HttpTestingController);
    currentDate = dayjs();

    elemDefault = {
      id: 0,
      monto: 0,
      descripcion: 'AAAAAAA',
      fecha: currentDate,
      impuesto: 0,
      adicional: 0,
      nombreReceptor: 'AAAAAAA',
      apellidoReceptor: 'AAAAAAA',
      correoReceptor: 'AAAAAAA',
      nombreStartup: 'AAAAAAA',
      correoStartup: 'AAAAAAA',
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

    it('should create a Facturas', () => {
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

      service.create(new Facturas()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Facturas', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          monto: 1,
          descripcion: 'BBBBBB',
          fecha: currentDate.format(DATE_TIME_FORMAT),
          impuesto: 1,
          adicional: 1,
          nombreReceptor: 'BBBBBB',
          apellidoReceptor: 'BBBBBB',
          correoReceptor: 'BBBBBB',
          nombreStartup: 'BBBBBB',
          correoStartup: 'BBBBBB',
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

    it('should partial update a Facturas', () => {
      const patchObject = Object.assign(
        {
          monto: 1,
          fecha: currentDate.format(DATE_TIME_FORMAT),
          impuesto: 1,
          adicional: 1,
          nombreReceptor: 'BBBBBB',
          apellidoReceptor: 'BBBBBB',
          estado: 'BBBBBB',
        },
        new Facturas()
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

    it('should return a list of Facturas', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          monto: 1,
          descripcion: 'BBBBBB',
          fecha: currentDate.format(DATE_TIME_FORMAT),
          impuesto: 1,
          adicional: 1,
          nombreReceptor: 'BBBBBB',
          apellidoReceptor: 'BBBBBB',
          correoReceptor: 'BBBBBB',
          nombreStartup: 'BBBBBB',
          correoStartup: 'BBBBBB',
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

    it('should delete a Facturas', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addFacturasToCollectionIfMissing', () => {
      it('should add a Facturas to an empty array', () => {
        const facturas: IFacturas = { id: 123 };
        expectedResult = service.addFacturasToCollectionIfMissing([], facturas);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(facturas);
      });

      it('should not add a Facturas to an array that contains it', () => {
        const facturas: IFacturas = { id: 123 };
        const facturasCollection: IFacturas[] = [
          {
            ...facturas,
          },
          { id: 456 },
        ];
        expectedResult = service.addFacturasToCollectionIfMissing(facturasCollection, facturas);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Facturas to an array that doesn't contain it", () => {
        const facturas: IFacturas = { id: 123 };
        const facturasCollection: IFacturas[] = [{ id: 456 }];
        expectedResult = service.addFacturasToCollectionIfMissing(facturasCollection, facturas);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(facturas);
      });

      it('should add only unique Facturas to an array', () => {
        const facturasArray: IFacturas[] = [{ id: 123 }, { id: 456 }, { id: 69421 }];
        const facturasCollection: IFacturas[] = [{ id: 123 }];
        expectedResult = service.addFacturasToCollectionIfMissing(facturasCollection, ...facturasArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const facturas: IFacturas = { id: 123 };
        const facturas2: IFacturas = { id: 456 };
        expectedResult = service.addFacturasToCollectionIfMissing([], facturas, facturas2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(facturas);
        expect(expectedResult).toContain(facturas2);
      });

      it('should accept null and undefined values', () => {
        const facturas: IFacturas = { id: 123 };
        expectedResult = service.addFacturasToCollectionIfMissing([], null, facturas, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(facturas);
      });

      it('should return initial array if no Facturas is added', () => {
        const facturasCollection: IFacturas[] = [{ id: 123 }];
        expectedResult = service.addFacturasToCollectionIfMissing(facturasCollection, undefined, null);
        expect(expectedResult).toEqual(facturasCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
