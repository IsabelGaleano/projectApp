import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import dayjs from 'dayjs/esm';

import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IReuniones, Reuniones } from '../reuniones.model';

import { ReunionesService } from './reuniones.service';

describe('Reuniones Service', () => {
  let service: ReunionesService;
  let httpMock: HttpTestingController;
  let elemDefault: IReuniones;
  let expectedResult: IReuniones | IReuniones[] | boolean | null;
  let currentDate: dayjs.Dayjs;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(ReunionesService);
    httpMock = TestBed.inject(HttpTestingController);
    currentDate = dayjs();

    elemDefault = {
      id: 0,
      url: 'AAAAAAA',
      descripcion: 'AAAAAAA',
      fechaSolicitada: currentDate,
      fechaReunion: currentDate,
      horaReunion: currentDate,
      estado: 'AAAAAAA',
    };
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = Object.assign(
        {
          fechaSolicitada: currentDate.format(DATE_TIME_FORMAT),
          fechaReunion: currentDate.format(DATE_TIME_FORMAT),
          horaReunion: currentDate.format(DATE_TIME_FORMAT),
        },
        elemDefault
      );

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(elemDefault);
    });

    it('should create a Reuniones', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
          fechaSolicitada: currentDate.format(DATE_TIME_FORMAT),
          fechaReunion: currentDate.format(DATE_TIME_FORMAT),
          horaReunion: currentDate.format(DATE_TIME_FORMAT),
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          fechaSolicitada: currentDate,
          fechaReunion: currentDate,
          horaReunion: currentDate,
        },
        returnedFromService
      );

      service.create(new Reuniones()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Reuniones', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          url: 'BBBBBB',
          descripcion: 'BBBBBB',
          fechaSolicitada: currentDate.format(DATE_TIME_FORMAT),
          fechaReunion: currentDate.format(DATE_TIME_FORMAT),
          horaReunion: currentDate.format(DATE_TIME_FORMAT),
          estado: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          fechaSolicitada: currentDate,
          fechaReunion: currentDate,
          horaReunion: currentDate,
        },
        returnedFromService
      );

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Reuniones', () => {
      const patchObject = Object.assign(
        {
          descripcion: 'BBBBBB',
          fechaSolicitada: currentDate.format(DATE_TIME_FORMAT),
          fechaReunion: currentDate.format(DATE_TIME_FORMAT),
          horaReunion: currentDate.format(DATE_TIME_FORMAT),
          estado: 'BBBBBB',
        },
        new Reuniones()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign(
        {
          fechaSolicitada: currentDate,
          fechaReunion: currentDate,
          horaReunion: currentDate,
        },
        returnedFromService
      );

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Reuniones', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          url: 'BBBBBB',
          descripcion: 'BBBBBB',
          fechaSolicitada: currentDate.format(DATE_TIME_FORMAT),
          fechaReunion: currentDate.format(DATE_TIME_FORMAT),
          horaReunion: currentDate.format(DATE_TIME_FORMAT),
          estado: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          fechaSolicitada: currentDate,
          fechaReunion: currentDate,
          horaReunion: currentDate,
        },
        returnedFromService
      );

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toContainEqual(expected);
    });

    it('should delete a Reuniones', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addReunionesToCollectionIfMissing', () => {
      it('should add a Reuniones to an empty array', () => {
        const reuniones: IReuniones = { id: 123 };
        expectedResult = service.addReunionesToCollectionIfMissing([], reuniones);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(reuniones);
      });

      it('should not add a Reuniones to an array that contains it', () => {
        const reuniones: IReuniones = { id: 123 };
        const reunionesCollection: IReuniones[] = [
          {
            ...reuniones,
          },
          { id: 456 },
        ];
        expectedResult = service.addReunionesToCollectionIfMissing(reunionesCollection, reuniones);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Reuniones to an array that doesn't contain it", () => {
        const reuniones: IReuniones = { id: 123 };
        const reunionesCollection: IReuniones[] = [{ id: 456 }];
        expectedResult = service.addReunionesToCollectionIfMissing(reunionesCollection, reuniones);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(reuniones);
      });

      it('should add only unique Reuniones to an array', () => {
        const reunionesArray: IReuniones[] = [{ id: 123 }, { id: 456 }, { id: 57089 }];
        const reunionesCollection: IReuniones[] = [{ id: 123 }];
        expectedResult = service.addReunionesToCollectionIfMissing(reunionesCollection, ...reunionesArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const reuniones: IReuniones = { id: 123 };
        const reuniones2: IReuniones = { id: 456 };
        expectedResult = service.addReunionesToCollectionIfMissing([], reuniones, reuniones2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(reuniones);
        expect(expectedResult).toContain(reuniones2);
      });

      it('should accept null and undefined values', () => {
        const reuniones: IReuniones = { id: 123 };
        expectedResult = service.addReunionesToCollectionIfMissing([], null, reuniones, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(reuniones);
      });

      it('should return initial array if no Reuniones is added', () => {
        const reunionesCollection: IReuniones[] = [{ id: 123 }];
        expectedResult = service.addReunionesToCollectionIfMissing(reunionesCollection, undefined, null);
        expect(expectedResult).toEqual(reunionesCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
