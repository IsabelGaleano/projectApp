import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ICodigos, Codigos } from '../codigos.model';

import { CodigosService } from './codigos.service';

describe('Codigos Service', () => {
  let service: CodigosService;
  let httpMock: HttpTestingController;
  let elemDefault: ICodigos;
  let expectedResult: ICodigos | ICodigos[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(CodigosService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
      codigo: 'AAAAAAA',
      estado: 'AAAAAAA',
    };
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = Object.assign({}, elemDefault);

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(elemDefault);
    });

    it('should create a Codigos', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new Codigos()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Codigos', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          codigo: 'BBBBBB',
          estado: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Codigos', () => {
      const patchObject = Object.assign(
        {
          codigo: 'BBBBBB',
          estado: 'BBBBBB',
        },
        new Codigos()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Codigos', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          codigo: 'BBBBBB',
          estado: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toContainEqual(expected);
    });

    it('should delete a Codigos', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addCodigosToCollectionIfMissing', () => {
      it('should add a Codigos to an empty array', () => {
        const codigos: ICodigos = { id: 123 };
        expectedResult = service.addCodigosToCollectionIfMissing([], codigos);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(codigos);
      });

      it('should not add a Codigos to an array that contains it', () => {
        const codigos: ICodigos = { id: 123 };
        const codigosCollection: ICodigos[] = [
          {
            ...codigos,
          },
          { id: 456 },
        ];
        expectedResult = service.addCodigosToCollectionIfMissing(codigosCollection, codigos);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Codigos to an array that doesn't contain it", () => {
        const codigos: ICodigos = { id: 123 };
        const codigosCollection: ICodigos[] = [{ id: 456 }];
        expectedResult = service.addCodigosToCollectionIfMissing(codigosCollection, codigos);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(codigos);
      });

      it('should add only unique Codigos to an array', () => {
        const codigosArray: ICodigos[] = [{ id: 123 }, { id: 456 }, { id: 6760 }];
        const codigosCollection: ICodigos[] = [{ id: 123 }];
        expectedResult = service.addCodigosToCollectionIfMissing(codigosCollection, ...codigosArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const codigos: ICodigos = { id: 123 };
        const codigos2: ICodigos = { id: 456 };
        expectedResult = service.addCodigosToCollectionIfMissing([], codigos, codigos2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(codigos);
        expect(expectedResult).toContain(codigos2);
      });

      it('should accept null and undefined values', () => {
        const codigos: ICodigos = { id: 123 };
        expectedResult = service.addCodigosToCollectionIfMissing([], null, codigos, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(codigos);
      });

      it('should return initial array if no Codigos is added', () => {
        const codigosCollection: ICodigos[] = [{ id: 123 }];
        expectedResult = service.addCodigosToCollectionIfMissing(codigosCollection, undefined, null);
        expect(expectedResult).toEqual(codigosCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
