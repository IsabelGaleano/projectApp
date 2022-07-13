import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import dayjs from 'dayjs/esm';

import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IVotos, Votos } from '../votos.model';

import { VotosService } from './votos.service';

describe('Votos Service', () => {
  let service: VotosService;
  let httpMock: HttpTestingController;
  let elemDefault: IVotos;
  let expectedResult: IVotos | IVotos[] | boolean | null;
  let currentDate: dayjs.Dayjs;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(VotosService);
    httpMock = TestBed.inject(HttpTestingController);
    currentDate = dayjs();

    elemDefault = {
      id: 0,
      votos: 0,
      estado: 'AAAAAAA',
      fecha: currentDate,
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

    it('should create a Votos', () => {
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

      service.create(new Votos()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Votos', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          votos: 1,
          estado: 'BBBBBB',
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

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Votos', () => {
      const patchObject = Object.assign(
        {
          estado: 'BBBBBB',
          fecha: currentDate.format(DATE_TIME_FORMAT),
        },
        new Votos()
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

    it('should return a list of Votos', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          votos: 1,
          estado: 'BBBBBB',
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

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toContainEqual(expected);
    });

    it('should delete a Votos', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addVotosToCollectionIfMissing', () => {
      it('should add a Votos to an empty array', () => {
        const votos: IVotos = { id: 123 };
        expectedResult = service.addVotosToCollectionIfMissing([], votos);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(votos);
      });

      it('should not add a Votos to an array that contains it', () => {
        const votos: IVotos = { id: 123 };
        const votosCollection: IVotos[] = [
          {
            ...votos,
          },
          { id: 456 },
        ];
        expectedResult = service.addVotosToCollectionIfMissing(votosCollection, votos);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Votos to an array that doesn't contain it", () => {
        const votos: IVotos = { id: 123 };
        const votosCollection: IVotos[] = [{ id: 456 }];
        expectedResult = service.addVotosToCollectionIfMissing(votosCollection, votos);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(votos);
      });

      it('should add only unique Votos to an array', () => {
        const votosArray: IVotos[] = [{ id: 123 }, { id: 456 }, { id: 78099 }];
        const votosCollection: IVotos[] = [{ id: 123 }];
        expectedResult = service.addVotosToCollectionIfMissing(votosCollection, ...votosArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const votos: IVotos = { id: 123 };
        const votos2: IVotos = { id: 456 };
        expectedResult = service.addVotosToCollectionIfMissing([], votos, votos2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(votos);
        expect(expectedResult).toContain(votos2);
      });

      it('should accept null and undefined values', () => {
        const votos: IVotos = { id: 123 };
        expectedResult = service.addVotosToCollectionIfMissing([], null, votos, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(votos);
      });

      it('should return initial array if no Votos is added', () => {
        const votosCollection: IVotos[] = [{ id: 123 }];
        expectedResult = service.addVotosToCollectionIfMissing(votosCollection, undefined, null);
        expect(expectedResult).toEqual(votosCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
