import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IPaquetes, Paquetes } from '../paquetes.model';

import { PaquetesService } from './paquetes.service';

describe('Paquetes Service', () => {
  let service: PaquetesService;
  let httpMock: HttpTestingController;
  let elemDefault: IPaquetes;
  let expectedResult: IPaquetes | IPaquetes[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(PaquetesService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
      nombre: 'AAAAAAA',
      monto: 0,
      descripcion: 'AAAAAAA',
      dimensiones: 'AAAAAAA',
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

    it('should create a Paquetes', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new Paquetes()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Paquetes', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          nombre: 'BBBBBB',
          monto: 1,
          descripcion: 'BBBBBB',
          dimensiones: 'BBBBBB',
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

    it('should partial update a Paquetes', () => {
      const patchObject = Object.assign(
        {
          descripcion: 'BBBBBB',
          dimensiones: 'BBBBBB',
          estado: 'BBBBBB',
        },
        new Paquetes()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Paquetes', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          nombre: 'BBBBBB',
          monto: 1,
          descripcion: 'BBBBBB',
          dimensiones: 'BBBBBB',
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

    it('should delete a Paquetes', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addPaquetesToCollectionIfMissing', () => {
      it('should add a Paquetes to an empty array', () => {
        const paquetes: IPaquetes = { id: 123 };
        expectedResult = service.addPaquetesToCollectionIfMissing([], paquetes);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(paquetes);
      });

      it('should not add a Paquetes to an array that contains it', () => {
        const paquetes: IPaquetes = { id: 123 };
        const paquetesCollection: IPaquetes[] = [
          {
            ...paquetes,
          },
          { id: 456 },
        ];
        expectedResult = service.addPaquetesToCollectionIfMissing(paquetesCollection, paquetes);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Paquetes to an array that doesn't contain it", () => {
        const paquetes: IPaquetes = { id: 123 };
        const paquetesCollection: IPaquetes[] = [{ id: 456 }];
        expectedResult = service.addPaquetesToCollectionIfMissing(paquetesCollection, paquetes);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(paquetes);
      });

      it('should add only unique Paquetes to an array', () => {
        const paquetesArray: IPaquetes[] = [{ id: 123 }, { id: 456 }, { id: 25931 }];
        const paquetesCollection: IPaquetes[] = [{ id: 123 }];
        expectedResult = service.addPaquetesToCollectionIfMissing(paquetesCollection, ...paquetesArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const paquetes: IPaquetes = { id: 123 };
        const paquetes2: IPaquetes = { id: 456 };
        expectedResult = service.addPaquetesToCollectionIfMissing([], paquetes, paquetes2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(paquetes);
        expect(expectedResult).toContain(paquetes2);
      });

      it('should accept null and undefined values', () => {
        const paquetes: IPaquetes = { id: 123 };
        expectedResult = service.addPaquetesToCollectionIfMissing([], null, paquetes, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(paquetes);
      });

      it('should return initial array if no Paquetes is added', () => {
        const paquetesCollection: IPaquetes[] = [{ id: 123 }];
        expectedResult = service.addPaquetesToCollectionIfMissing(paquetesCollection, undefined, null);
        expect(expectedResult).toEqual(paquetesCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
