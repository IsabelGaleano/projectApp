import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IRolesUsuarios, RolesUsuarios } from '../roles-usuarios.model';

import { RolesUsuariosService } from './roles-usuarios.service';

describe('RolesUsuarios Service', () => {
  let service: RolesUsuariosService;
  let httpMock: HttpTestingController;
  let elemDefault: IRolesUsuarios;
  let expectedResult: IRolesUsuarios | IRolesUsuarios[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(RolesUsuariosService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
      rol: 'AAAAAAA',
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

    it('should create a RolesUsuarios', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new RolesUsuarios()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a RolesUsuarios', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          rol: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a RolesUsuarios', () => {
      const patchObject = Object.assign({}, new RolesUsuarios());

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of RolesUsuarios', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          rol: 'BBBBBB',
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

    it('should delete a RolesUsuarios', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addRolesUsuariosToCollectionIfMissing', () => {
      it('should add a RolesUsuarios to an empty array', () => {
        const rolesUsuarios: IRolesUsuarios = { id: 123 };
        expectedResult = service.addRolesUsuariosToCollectionIfMissing([], rolesUsuarios);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(rolesUsuarios);
      });

      it('should not add a RolesUsuarios to an array that contains it', () => {
        const rolesUsuarios: IRolesUsuarios = { id: 123 };
        const rolesUsuariosCollection: IRolesUsuarios[] = [
          {
            ...rolesUsuarios,
          },
          { id: 456 },
        ];
        expectedResult = service.addRolesUsuariosToCollectionIfMissing(rolesUsuariosCollection, rolesUsuarios);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a RolesUsuarios to an array that doesn't contain it", () => {
        const rolesUsuarios: IRolesUsuarios = { id: 123 };
        const rolesUsuariosCollection: IRolesUsuarios[] = [{ id: 456 }];
        expectedResult = service.addRolesUsuariosToCollectionIfMissing(rolesUsuariosCollection, rolesUsuarios);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(rolesUsuarios);
      });

      it('should add only unique RolesUsuarios to an array', () => {
        const rolesUsuariosArray: IRolesUsuarios[] = [{ id: 123 }, { id: 456 }, { id: 12385 }];
        const rolesUsuariosCollection: IRolesUsuarios[] = [{ id: 123 }];
        expectedResult = service.addRolesUsuariosToCollectionIfMissing(rolesUsuariosCollection, ...rolesUsuariosArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const rolesUsuarios: IRolesUsuarios = { id: 123 };
        const rolesUsuarios2: IRolesUsuarios = { id: 456 };
        expectedResult = service.addRolesUsuariosToCollectionIfMissing([], rolesUsuarios, rolesUsuarios2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(rolesUsuarios);
        expect(expectedResult).toContain(rolesUsuarios2);
      });

      it('should accept null and undefined values', () => {
        const rolesUsuarios: IRolesUsuarios = { id: 123 };
        expectedResult = service.addRolesUsuariosToCollectionIfMissing([], null, rolesUsuarios, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(rolesUsuarios);
      });

      it('should return initial array if no RolesUsuarios is added', () => {
        const rolesUsuariosCollection: IRolesUsuarios[] = [{ id: 123 }];
        expectedResult = service.addRolesUsuariosToCollectionIfMissing(rolesUsuariosCollection, undefined, null);
        expect(expectedResult).toEqual(rolesUsuariosCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
