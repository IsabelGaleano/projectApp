import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import dayjs from 'dayjs/esm';

import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IStartups, Startups } from '../startups.model';

import { StartupsService } from './startups.service';

describe('Startups Service', () => {
  let service: StartupsService;
  let httpMock: HttpTestingController;
  let elemDefault: IStartups;
  let expectedResult: IStartups | IStartups[] | boolean | null;
  let currentDate: dayjs.Dayjs;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(StartupsService);
    httpMock = TestBed.inject(HttpTestingController);
    currentDate = dayjs();

    elemDefault = {
      id: 0,
      nombreCorto: 'AAAAAAA',
      nombreLargo: 'AAAAAAA',
      correoElectronico: 'AAAAAAA',
      telefono: 'AAAAAAA',
      contrasennia: 'AAAAAAA',
      latitudDireccion: 'AAAAAAA',
      longitudDireccion: 'AAAAAAA',
      descripcion: 'AAAAAAA',
      descripcionCorta: 'AAAAAAA',
      beneficios: 'AAAAAAA',
      riesgos: 'AAAAAAA',
      panoramaMercado: 'AAAAAAA',
      montoMeta: 0,
      tipoMeta: 'AAAAAAA',
      linkSitioWeb: 'AAAAAAA',
      imagenURL: 'AAAAAAA',
      fechaCreacion: currentDate,
      estado: 'AAAAAAA',
    };
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = Object.assign(
        {
          fechaCreacion: currentDate.format(DATE_TIME_FORMAT),
        },
        elemDefault
      );

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(elemDefault);
    });

    it('should create a Startups', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
          fechaCreacion: currentDate.format(DATE_TIME_FORMAT),
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          fechaCreacion: currentDate,
        },
        returnedFromService
      );

      service.create(new Startups()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Startups', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          nombreCorto: 'BBBBBB',
          nombreLargo: 'BBBBBB',
          correoElectronico: 'BBBBBB',
          telefono: 'BBBBBB',
          contrasennia: 'BBBBBB',
          latitudDireccion: 'BBBBBB',
          longitudDireccion: 'BBBBBB',
          descripcion: 'BBBBBB',
          descripcionCorta: 'BBBBBB',
          beneficios: 'BBBBBB',
          riesgos: 'BBBBBB',
          panoramaMercado: 'BBBBBB',
          montoMeta: 1,
          tipoMeta: 'BBBBBB',
          linkSitioWeb: 'BBBBBB',
          imagenURL: 'BBBBBB',
          fechaCreacion: currentDate.format(DATE_TIME_FORMAT),
          estado: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          fechaCreacion: currentDate,
        },
        returnedFromService
      );

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Startups', () => {
      const patchObject = Object.assign(
        {
          nombreCorto: 'BBBBBB',
          nombreLargo: 'BBBBBB',
          contrasennia: 'BBBBBB',
          latitudDireccion: 'BBBBBB',
          longitudDireccion: 'BBBBBB',
          descripcion: 'BBBBBB',
          descripcionCorta: 'BBBBBB',
          beneficios: 'BBBBBB',
          riesgos: 'BBBBBB',
          montoMeta: 1,
          linkSitioWeb: 'BBBBBB',
          imagenURL: 'BBBBBB',
          estado: 'BBBBBB',
        },
        new Startups()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign(
        {
          fechaCreacion: currentDate,
        },
        returnedFromService
      );

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Startups', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          nombreCorto: 'BBBBBB',
          nombreLargo: 'BBBBBB',
          correoElectronico: 'BBBBBB',
          telefono: 'BBBBBB',
          contrasennia: 'BBBBBB',
          latitudDireccion: 'BBBBBB',
          longitudDireccion: 'BBBBBB',
          descripcion: 'BBBBBB',
          descripcionCorta: 'BBBBBB',
          beneficios: 'BBBBBB',
          riesgos: 'BBBBBB',
          panoramaMercado: 'BBBBBB',
          montoMeta: 1,
          tipoMeta: 'BBBBBB',
          linkSitioWeb: 'BBBBBB',
          imagenURL: 'BBBBBB',
          fechaCreacion: currentDate.format(DATE_TIME_FORMAT),
          estado: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          fechaCreacion: currentDate,
        },
        returnedFromService
      );

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toContainEqual(expected);
    });

    it('should delete a Startups', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addStartupsToCollectionIfMissing', () => {
      it('should add a Startups to an empty array', () => {
        const startups: IStartups = { id: 123 };
        expectedResult = service.addStartupsToCollectionIfMissing([], startups);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(startups);
      });

      it('should not add a Startups to an array that contains it', () => {
        const startups: IStartups = { id: 123 };
        const startupsCollection: IStartups[] = [
          {
            ...startups,
          },
          { id: 456 },
        ];
        expectedResult = service.addStartupsToCollectionIfMissing(startupsCollection, startups);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Startups to an array that doesn't contain it", () => {
        const startups: IStartups = { id: 123 };
        const startupsCollection: IStartups[] = [{ id: 456 }];
        expectedResult = service.addStartupsToCollectionIfMissing(startupsCollection, startups);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(startups);
      });

      it('should add only unique Startups to an array', () => {
        const startupsArray: IStartups[] = [{ id: 123 }, { id: 456 }, { id: 25377 }];
        const startupsCollection: IStartups[] = [{ id: 123 }];
        expectedResult = service.addStartupsToCollectionIfMissing(startupsCollection, ...startupsArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const startups: IStartups = { id: 123 };
        const startups2: IStartups = { id: 456 };
        expectedResult = service.addStartupsToCollectionIfMissing([], startups, startups2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(startups);
        expect(expectedResult).toContain(startups2);
      });

      it('should accept null and undefined values', () => {
        const startups: IStartups = { id: 123 };
        expectedResult = service.addStartupsToCollectionIfMissing([], null, startups, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(startups);
      });

      it('should return initial array if no Startups is added', () => {
        const startupsCollection: IStartups[] = [{ id: 123 }];
        expectedResult = service.addStartupsToCollectionIfMissing(startupsCollection, undefined, null);
        expect(expectedResult).toEqual(startupsCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
