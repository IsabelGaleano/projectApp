import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IMonederos, Monederos } from '../monederos.model';

import { MonederosService } from './monederos.service';

describe('Monederos Service', () => {
  let service: MonederosService;
  let httpMock: HttpTestingController;
  let elemDefault: IMonederos;
  let expectedResult: IMonederos | IMonederos[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(MonederosService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
      tipo: 'AAAAAAA',
      saldo: 0,
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

    it('should create a Monederos', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new Monederos()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Monederos', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          tipo: 'BBBBBB',
          saldo: 1,
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

    it('should partial update a Monederos', () => {
      const patchObject = Object.assign(
        {
          estado: 'BBBBBB',
        },
        new Monederos()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Monederos', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          tipo: 'BBBBBB',
          saldo: 1,
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

    it('should delete a Monederos', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addMonederosToCollectionIfMissing', () => {
      it('should add a Monederos to an empty array', () => {
        const monederos: IMonederos = { id: 123 };
        expectedResult = service.addMonederosToCollectionIfMissing([], monederos);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(monederos);
      });

      it('should not add a Monederos to an array that contains it', () => {
        const monederos: IMonederos = { id: 123 };
        const monederosCollection: IMonederos[] = [
          {
            ...monederos,
          },
          { id: 456 },
        ];
        expectedResult = service.addMonederosToCollectionIfMissing(monederosCollection, monederos);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Monederos to an array that doesn't contain it", () => {
        const monederos: IMonederos = { id: 123 };
        const monederosCollection: IMonederos[] = [{ id: 456 }];
        expectedResult = service.addMonederosToCollectionIfMissing(monederosCollection, monederos);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(monederos);
      });

      it('should add only unique Monederos to an array', () => {
        const monederosArray: IMonederos[] = [{ id: 123 }, { id: 456 }, { id: 72112 }];
        const monederosCollection: IMonederos[] = [{ id: 123 }];
        expectedResult = service.addMonederosToCollectionIfMissing(monederosCollection, ...monederosArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const monederos: IMonederos = { id: 123 };
        const monederos2: IMonederos = { id: 456 };
        expectedResult = service.addMonederosToCollectionIfMissing([], monederos, monederos2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(monederos);
        expect(expectedResult).toContain(monederos2);
      });

      it('should accept null and undefined values', () => {
        const monederos: IMonederos = { id: 123 };
        expectedResult = service.addMonederosToCollectionIfMissing([], null, monederos, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(monederos);
      });

      it('should return initial array if no Monederos is added', () => {
        const monederosCollection: IMonederos[] = [{ id: 123 }];
        expectedResult = service.addMonederosToCollectionIfMissing(monederosCollection, undefined, null);
        expect(expectedResult).toEqual(monederosCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
