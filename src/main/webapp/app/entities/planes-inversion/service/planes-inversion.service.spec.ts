import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IPlanesInversion, PlanesInversion } from '../planes-inversion.model';

import { PlanesInversionService } from './planes-inversion.service';

describe('PlanesInversion Service', () => {
  let service: PlanesInversionService;
  let httpMock: HttpTestingController;
  let elemDefault: IPlanesInversion;
  let expectedResult: IPlanesInversion | IPlanesInversion[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(PlanesInversionService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
      nombre: 'AAAAAAA',
      monto: 0,
      descripcion: 'AAAAAAA',
      beneficios: 'AAAAAAA',
      porcentajeEmpresarial: 0,
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

    it('should create a PlanesInversion', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new PlanesInversion()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a PlanesInversion', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          nombre: 'BBBBBB',
          monto: 1,
          descripcion: 'BBBBBB',
          beneficios: 'BBBBBB',
          porcentajeEmpresarial: 1,
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

    it('should partial update a PlanesInversion', () => {
      const patchObject = Object.assign(
        {
          porcentajeEmpresarial: 1,
          estado: 'BBBBBB',
        },
        new PlanesInversion()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of PlanesInversion', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          nombre: 'BBBBBB',
          monto: 1,
          descripcion: 'BBBBBB',
          beneficios: 'BBBBBB',
          porcentajeEmpresarial: 1,
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

    it('should delete a PlanesInversion', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addPlanesInversionToCollectionIfMissing', () => {
      it('should add a PlanesInversion to an empty array', () => {
        const planesInversion: IPlanesInversion = { id: 123 };
        expectedResult = service.addPlanesInversionToCollectionIfMissing([], planesInversion);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(planesInversion);
      });

      it('should not add a PlanesInversion to an array that contains it', () => {
        const planesInversion: IPlanesInversion = { id: 123 };
        const planesInversionCollection: IPlanesInversion[] = [
          {
            ...planesInversion,
          },
          { id: 456 },
        ];
        expectedResult = service.addPlanesInversionToCollectionIfMissing(planesInversionCollection, planesInversion);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a PlanesInversion to an array that doesn't contain it", () => {
        const planesInversion: IPlanesInversion = { id: 123 };
        const planesInversionCollection: IPlanesInversion[] = [{ id: 456 }];
        expectedResult = service.addPlanesInversionToCollectionIfMissing(planesInversionCollection, planesInversion);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(planesInversion);
      });

      it('should add only unique PlanesInversion to an array', () => {
        const planesInversionArray: IPlanesInversion[] = [{ id: 123 }, { id: 456 }, { id: 93783 }];
        const planesInversionCollection: IPlanesInversion[] = [{ id: 123 }];
        expectedResult = service.addPlanesInversionToCollectionIfMissing(planesInversionCollection, ...planesInversionArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const planesInversion: IPlanesInversion = { id: 123 };
        const planesInversion2: IPlanesInversion = { id: 456 };
        expectedResult = service.addPlanesInversionToCollectionIfMissing([], planesInversion, planesInversion2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(planesInversion);
        expect(expectedResult).toContain(planesInversion2);
      });

      it('should accept null and undefined values', () => {
        const planesInversion: IPlanesInversion = { id: 123 };
        expectedResult = service.addPlanesInversionToCollectionIfMissing([], null, planesInversion, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(planesInversion);
      });

      it('should return initial array if no PlanesInversion is added', () => {
        const planesInversionCollection: IPlanesInversion[] = [{ id: 123 }];
        expectedResult = service.addPlanesInversionToCollectionIfMissing(planesInversionCollection, undefined, null);
        expect(expectedResult).toEqual(planesInversionCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
