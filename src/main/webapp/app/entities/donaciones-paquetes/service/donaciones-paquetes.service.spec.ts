import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import dayjs from 'dayjs/esm';

import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IDonacionesPaquetes, DonacionesPaquetes } from '../donaciones-paquetes.model';

import { DonacionesPaquetesService } from './donaciones-paquetes.service';

describe('DonacionesPaquetes Service', () => {
  let service: DonacionesPaquetesService;
  let httpMock: HttpTestingController;
  let elemDefault: IDonacionesPaquetes;
  let expectedResult: IDonacionesPaquetes | IDonacionesPaquetes[] | boolean | null;
  let currentDate: dayjs.Dayjs;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(DonacionesPaquetesService);
    httpMock = TestBed.inject(HttpTestingController);
    currentDate = dayjs();

    elemDefault = {
      id: 0,
      descripcion: 'AAAAAAA',
      montoEnvio: 0,
      montoImpuesto: 0,
      montoTotal: 0,
      fechaDonacion: currentDate,
      fechaEntrega: currentDate,
      fechaPosibleEntrega: currentDate,
      fechaInicialEnvio: currentDate,
      diasRetraso: 0,
      estado: 'AAAAAAA',
    };
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = Object.assign(
        {
          fechaDonacion: currentDate.format(DATE_TIME_FORMAT),
          fechaEntrega: currentDate.format(DATE_TIME_FORMAT),
          fechaPosibleEntrega: currentDate.format(DATE_TIME_FORMAT),
          fechaInicialEnvio: currentDate.format(DATE_TIME_FORMAT),
        },
        elemDefault
      );

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(elemDefault);
    });

    it('should create a DonacionesPaquetes', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
          fechaDonacion: currentDate.format(DATE_TIME_FORMAT),
          fechaEntrega: currentDate.format(DATE_TIME_FORMAT),
          fechaPosibleEntrega: currentDate.format(DATE_TIME_FORMAT),
          fechaInicialEnvio: currentDate.format(DATE_TIME_FORMAT),
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          fechaDonacion: currentDate,
          fechaEntrega: currentDate,
          fechaPosibleEntrega: currentDate,
          fechaInicialEnvio: currentDate,
        },
        returnedFromService
      );

      service.create(new DonacionesPaquetes()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a DonacionesPaquetes', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          descripcion: 'BBBBBB',
          montoEnvio: 1,
          montoImpuesto: 1,
          montoTotal: 1,
          fechaDonacion: currentDate.format(DATE_TIME_FORMAT),
          fechaEntrega: currentDate.format(DATE_TIME_FORMAT),
          fechaPosibleEntrega: currentDate.format(DATE_TIME_FORMAT),
          fechaInicialEnvio: currentDate.format(DATE_TIME_FORMAT),
          diasRetraso: 1,
          estado: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          fechaDonacion: currentDate,
          fechaEntrega: currentDate,
          fechaPosibleEntrega: currentDate,
          fechaInicialEnvio: currentDate,
        },
        returnedFromService
      );

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a DonacionesPaquetes', () => {
      const patchObject = Object.assign(
        {
          montoImpuesto: 1,
          montoTotal: 1,
          fechaDonacion: currentDate.format(DATE_TIME_FORMAT),
          fechaEntrega: currentDate.format(DATE_TIME_FORMAT),
          fechaInicialEnvio: currentDate.format(DATE_TIME_FORMAT),
        },
        new DonacionesPaquetes()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign(
        {
          fechaDonacion: currentDate,
          fechaEntrega: currentDate,
          fechaPosibleEntrega: currentDate,
          fechaInicialEnvio: currentDate,
        },
        returnedFromService
      );

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of DonacionesPaquetes', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          descripcion: 'BBBBBB',
          montoEnvio: 1,
          montoImpuesto: 1,
          montoTotal: 1,
          fechaDonacion: currentDate.format(DATE_TIME_FORMAT),
          fechaEntrega: currentDate.format(DATE_TIME_FORMAT),
          fechaPosibleEntrega: currentDate.format(DATE_TIME_FORMAT),
          fechaInicialEnvio: currentDate.format(DATE_TIME_FORMAT),
          diasRetraso: 1,
          estado: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          fechaDonacion: currentDate,
          fechaEntrega: currentDate,
          fechaPosibleEntrega: currentDate,
          fechaInicialEnvio: currentDate,
        },
        returnedFromService
      );

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toContainEqual(expected);
    });

    it('should delete a DonacionesPaquetes', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addDonacionesPaquetesToCollectionIfMissing', () => {
      it('should add a DonacionesPaquetes to an empty array', () => {
        const donacionesPaquetes: IDonacionesPaquetes = { id: 123 };
        expectedResult = service.addDonacionesPaquetesToCollectionIfMissing([], donacionesPaquetes);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(donacionesPaquetes);
      });

      it('should not add a DonacionesPaquetes to an array that contains it', () => {
        const donacionesPaquetes: IDonacionesPaquetes = { id: 123 };
        const donacionesPaquetesCollection: IDonacionesPaquetes[] = [
          {
            ...donacionesPaquetes,
          },
          { id: 456 },
        ];
        expectedResult = service.addDonacionesPaquetesToCollectionIfMissing(donacionesPaquetesCollection, donacionesPaquetes);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a DonacionesPaquetes to an array that doesn't contain it", () => {
        const donacionesPaquetes: IDonacionesPaquetes = { id: 123 };
        const donacionesPaquetesCollection: IDonacionesPaquetes[] = [{ id: 456 }];
        expectedResult = service.addDonacionesPaquetesToCollectionIfMissing(donacionesPaquetesCollection, donacionesPaquetes);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(donacionesPaquetes);
      });

      it('should add only unique DonacionesPaquetes to an array', () => {
        const donacionesPaquetesArray: IDonacionesPaquetes[] = [{ id: 123 }, { id: 456 }, { id: 91091 }];
        const donacionesPaquetesCollection: IDonacionesPaquetes[] = [{ id: 123 }];
        expectedResult = service.addDonacionesPaquetesToCollectionIfMissing(donacionesPaquetesCollection, ...donacionesPaquetesArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const donacionesPaquetes: IDonacionesPaquetes = { id: 123 };
        const donacionesPaquetes2: IDonacionesPaquetes = { id: 456 };
        expectedResult = service.addDonacionesPaquetesToCollectionIfMissing([], donacionesPaquetes, donacionesPaquetes2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(donacionesPaquetes);
        expect(expectedResult).toContain(donacionesPaquetes2);
      });

      it('should accept null and undefined values', () => {
        const donacionesPaquetes: IDonacionesPaquetes = { id: 123 };
        expectedResult = service.addDonacionesPaquetesToCollectionIfMissing([], null, donacionesPaquetes, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(donacionesPaquetes);
      });

      it('should return initial array if no DonacionesPaquetes is added', () => {
        const donacionesPaquetesCollection: IDonacionesPaquetes[] = [{ id: 123 }];
        expectedResult = service.addDonacionesPaquetesToCollectionIfMissing(donacionesPaquetesCollection, undefined, null);
        expect(expectedResult).toEqual(donacionesPaquetesCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
