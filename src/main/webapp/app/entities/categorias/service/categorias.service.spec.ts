import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ICategorias, Categorias } from '../categorias.model';

import { CategoriasService } from './categorias.service';

describe('Categorias Service', () => {
  let service: CategoriasService;
  let httpMock: HttpTestingController;
  let elemDefault: ICategorias;
  let expectedResult: ICategorias | ICategorias[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(CategoriasService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
      categoria: 'AAAAAAA',
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

    it('should create a Categorias', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new Categorias()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Categorias', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          categoria: 'BBBBBB',
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

    it('should partial update a Categorias', () => {
      const patchObject = Object.assign(
        {
          categoria: 'BBBBBB',
          estado: 'BBBBBB',
        },
        new Categorias()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Categorias', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          categoria: 'BBBBBB',
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

    it('should delete a Categorias', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addCategoriasToCollectionIfMissing', () => {
      it('should add a Categorias to an empty array', () => {
        const categorias: ICategorias = { id: 123 };
        expectedResult = service.addCategoriasToCollectionIfMissing([], categorias);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(categorias);
      });

      it('should not add a Categorias to an array that contains it', () => {
        const categorias: ICategorias = { id: 123 };
        const categoriasCollection: ICategorias[] = [
          {
            ...categorias,
          },
          { id: 456 },
        ];
        expectedResult = service.addCategoriasToCollectionIfMissing(categoriasCollection, categorias);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Categorias to an array that doesn't contain it", () => {
        const categorias: ICategorias = { id: 123 };
        const categoriasCollection: ICategorias[] = [{ id: 456 }];
        expectedResult = service.addCategoriasToCollectionIfMissing(categoriasCollection, categorias);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(categorias);
      });

      it('should add only unique Categorias to an array', () => {
        const categoriasArray: ICategorias[] = [{ id: 123 }, { id: 456 }, { id: 69125 }];
        const categoriasCollection: ICategorias[] = [{ id: 123 }];
        expectedResult = service.addCategoriasToCollectionIfMissing(categoriasCollection, ...categoriasArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const categorias: ICategorias = { id: 123 };
        const categorias2: ICategorias = { id: 456 };
        expectedResult = service.addCategoriasToCollectionIfMissing([], categorias, categorias2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(categorias);
        expect(expectedResult).toContain(categorias2);
      });

      it('should accept null and undefined values', () => {
        const categorias: ICategorias = { id: 123 };
        expectedResult = service.addCategoriasToCollectionIfMissing([], null, categorias, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(categorias);
      });

      it('should return initial array if no Categorias is added', () => {
        const categoriasCollection: ICategorias[] = [{ id: 123 }];
        expectedResult = service.addCategoriasToCollectionIfMissing(categoriasCollection, undefined, null);
        expect(expectedResult).toEqual(categoriasCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
