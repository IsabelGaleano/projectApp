import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import dayjs from 'dayjs/esm';

import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IComentarios, Comentarios } from '../comentarios.model';

import { ComentariosService } from './comentarios.service';

describe('Comentarios Service', () => {
  let service: ComentariosService;
  let httpMock: HttpTestingController;
  let elemDefault: IComentarios;
  let expectedResult: IComentarios | IComentarios[] | boolean | null;
  let currentDate: dayjs.Dayjs;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(ComentariosService);
    httpMock = TestBed.inject(HttpTestingController);
    currentDate = dayjs();

    elemDefault = {
      id: 0,
      comentario: 'AAAAAAA',
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

    it('should create a Comentarios', () => {
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

      service.create(new Comentarios()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Comentarios', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          comentario: 'BBBBBB',
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

    it('should partial update a Comentarios', () => {
      const patchObject = Object.assign(
        {
          comentario: 'BBBBBB',
          estado: 'BBBBBB',
        },
        new Comentarios()
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

    it('should return a list of Comentarios', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          comentario: 'BBBBBB',
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

    it('should delete a Comentarios', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addComentariosToCollectionIfMissing', () => {
      it('should add a Comentarios to an empty array', () => {
        const comentarios: IComentarios = { id: 123 };
        expectedResult = service.addComentariosToCollectionIfMissing([], comentarios);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(comentarios);
      });

      it('should not add a Comentarios to an array that contains it', () => {
        const comentarios: IComentarios = { id: 123 };
        const comentariosCollection: IComentarios[] = [
          {
            ...comentarios,
          },
          { id: 456 },
        ];
        expectedResult = service.addComentariosToCollectionIfMissing(comentariosCollection, comentarios);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Comentarios to an array that doesn't contain it", () => {
        const comentarios: IComentarios = { id: 123 };
        const comentariosCollection: IComentarios[] = [{ id: 456 }];
        expectedResult = service.addComentariosToCollectionIfMissing(comentariosCollection, comentarios);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(comentarios);
      });

      it('should add only unique Comentarios to an array', () => {
        const comentariosArray: IComentarios[] = [{ id: 123 }, { id: 456 }, { id: 78842 }];
        const comentariosCollection: IComentarios[] = [{ id: 123 }];
        expectedResult = service.addComentariosToCollectionIfMissing(comentariosCollection, ...comentariosArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const comentarios: IComentarios = { id: 123 };
        const comentarios2: IComentarios = { id: 456 };
        expectedResult = service.addComentariosToCollectionIfMissing([], comentarios, comentarios2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(comentarios);
        expect(expectedResult).toContain(comentarios2);
      });

      it('should accept null and undefined values', () => {
        const comentarios: IComentarios = { id: 123 };
        expectedResult = service.addComentariosToCollectionIfMissing([], null, comentarios, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(comentarios);
      });

      it('should return initial array if no Comentarios is added', () => {
        const comentariosCollection: IComentarios[] = [{ id: 123 }];
        expectedResult = service.addComentariosToCollectionIfMissing(comentariosCollection, undefined, null);
        expect(expectedResult).toEqual(comentariosCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
