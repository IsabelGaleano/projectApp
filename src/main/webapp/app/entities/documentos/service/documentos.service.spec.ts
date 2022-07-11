import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IDocumentos, Documentos } from '../documentos.model';

import { DocumentosService } from './documentos.service';

describe('Documentos Service', () => {
  let service: DocumentosService;
  let httpMock: HttpTestingController;
  let elemDefault: IDocumentos;
  let expectedResult: IDocumentos | IDocumentos[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(DocumentosService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
      nombre: 'AAAAAAA',
      descripcion: 'AAAAAAA',
      url: 'AAAAAAA',
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

    it('should create a Documentos', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new Documentos()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Documentos', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          nombre: 'BBBBBB',
          descripcion: 'BBBBBB',
          url: 'BBBBBB',
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

    it('should partial update a Documentos', () => {
      const patchObject = Object.assign(
        {
          url: 'BBBBBB',
          estado: 'BBBBBB',
        },
        new Documentos()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Documentos', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          nombre: 'BBBBBB',
          descripcion: 'BBBBBB',
          url: 'BBBBBB',
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

    it('should delete a Documentos', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addDocumentosToCollectionIfMissing', () => {
      it('should add a Documentos to an empty array', () => {
        const documentos: IDocumentos = { id: 123 };
        expectedResult = service.addDocumentosToCollectionIfMissing([], documentos);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(documentos);
      });

      it('should not add a Documentos to an array that contains it', () => {
        const documentos: IDocumentos = { id: 123 };
        const documentosCollection: IDocumentos[] = [
          {
            ...documentos,
          },
          { id: 456 },
        ];
        expectedResult = service.addDocumentosToCollectionIfMissing(documentosCollection, documentos);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Documentos to an array that doesn't contain it", () => {
        const documentos: IDocumentos = { id: 123 };
        const documentosCollection: IDocumentos[] = [{ id: 456 }];
        expectedResult = service.addDocumentosToCollectionIfMissing(documentosCollection, documentos);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(documentos);
      });

      it('should add only unique Documentos to an array', () => {
        const documentosArray: IDocumentos[] = [{ id: 123 }, { id: 456 }, { id: 65683 }];
        const documentosCollection: IDocumentos[] = [{ id: 123 }];
        expectedResult = service.addDocumentosToCollectionIfMissing(documentosCollection, ...documentosArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const documentos: IDocumentos = { id: 123 };
        const documentos2: IDocumentos = { id: 456 };
        expectedResult = service.addDocumentosToCollectionIfMissing([], documentos, documentos2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(documentos);
        expect(expectedResult).toContain(documentos2);
      });

      it('should accept null and undefined values', () => {
        const documentos: IDocumentos = { id: 123 };
        expectedResult = service.addDocumentosToCollectionIfMissing([], null, documentos, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(documentos);
      });

      it('should return initial array if no Documentos is added', () => {
        const documentosCollection: IDocumentos[] = [{ id: 123 }];
        expectedResult = service.addDocumentosToCollectionIfMissing(documentosCollection, undefined, null);
        expect(expectedResult).toEqual(documentosCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
