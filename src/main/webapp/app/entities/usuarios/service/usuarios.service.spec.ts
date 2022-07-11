import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import dayjs from 'dayjs/esm';

import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IUsuarios, Usuarios } from '../usuarios.model';

import { UsuariosService } from './usuarios.service';

describe('Usuarios Service', () => {
  let service: UsuariosService;
  let httpMock: HttpTestingController;
  let elemDefault: IUsuarios;
  let expectedResult: IUsuarios | IUsuarios[] | boolean | null;
  let currentDate: dayjs.Dayjs;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(UsuariosService);
    httpMock = TestBed.inject(HttpTestingController);
    currentDate = dayjs();

    elemDefault = {
      id: 0,
      nombre: 'AAAAAAA',
      cedula: 'AAAAAAA',
      primerApellido: 'AAAAAAA',
      segundoApellido: 'AAAAAAA',
      correoElectronico: 'AAAAAAA',
      genero: 'AAAAAAA',
      telefono: 'AAAAAAA',
      fechaNacimiento: currentDate,
      latitudDireccion: 'AAAAAAA',
      longitudDireccion: 'AAAAAAA',
      imagenURL: 'AAAAAAA',
      tipoUsuarioFinal: 'AAAAAAA',
      contrasennia: 'AAAAAAA',
      estado: 'AAAAAAA',
    };
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = Object.assign(
        {
          fechaNacimiento: currentDate.format(DATE_TIME_FORMAT),
        },
        elemDefault
      );

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(elemDefault);
    });

    it('should create a Usuarios', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
          fechaNacimiento: currentDate.format(DATE_TIME_FORMAT),
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          fechaNacimiento: currentDate,
        },
        returnedFromService
      );

      service.create(new Usuarios()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Usuarios', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          nombre: 'BBBBBB',
          cedula: 'BBBBBB',
          primerApellido: 'BBBBBB',
          segundoApellido: 'BBBBBB',
          correoElectronico: 'BBBBBB',
          genero: 'BBBBBB',
          telefono: 'BBBBBB',
          fechaNacimiento: currentDate.format(DATE_TIME_FORMAT),
          latitudDireccion: 'BBBBBB',
          longitudDireccion: 'BBBBBB',
          imagenURL: 'BBBBBB',
          tipoUsuarioFinal: 'BBBBBB',
          contrasennia: 'BBBBBB',
          estado: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          fechaNacimiento: currentDate,
        },
        returnedFromService
      );

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Usuarios', () => {
      const patchObject = Object.assign(
        {
          nombre: 'BBBBBB',
          primerApellido: 'BBBBBB',
          segundoApellido: 'BBBBBB',
          correoElectronico: 'BBBBBB',
          longitudDireccion: 'BBBBBB',
          tipoUsuarioFinal: 'BBBBBB',
          estado: 'BBBBBB',
        },
        new Usuarios()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign(
        {
          fechaNacimiento: currentDate,
        },
        returnedFromService
      );

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Usuarios', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          nombre: 'BBBBBB',
          cedula: 'BBBBBB',
          primerApellido: 'BBBBBB',
          segundoApellido: 'BBBBBB',
          correoElectronico: 'BBBBBB',
          genero: 'BBBBBB',
          telefono: 'BBBBBB',
          fechaNacimiento: currentDate.format(DATE_TIME_FORMAT),
          latitudDireccion: 'BBBBBB',
          longitudDireccion: 'BBBBBB',
          imagenURL: 'BBBBBB',
          tipoUsuarioFinal: 'BBBBBB',
          contrasennia: 'BBBBBB',
          estado: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          fechaNacimiento: currentDate,
        },
        returnedFromService
      );

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toContainEqual(expected);
    });

    it('should delete a Usuarios', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addUsuariosToCollectionIfMissing', () => {
      it('should add a Usuarios to an empty array', () => {
        const usuarios: IUsuarios = { id: 123 };
        expectedResult = service.addUsuariosToCollectionIfMissing([], usuarios);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(usuarios);
      });

      it('should not add a Usuarios to an array that contains it', () => {
        const usuarios: IUsuarios = { id: 123 };
        const usuariosCollection: IUsuarios[] = [
          {
            ...usuarios,
          },
          { id: 456 },
        ];
        expectedResult = service.addUsuariosToCollectionIfMissing(usuariosCollection, usuarios);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Usuarios to an array that doesn't contain it", () => {
        const usuarios: IUsuarios = { id: 123 };
        const usuariosCollection: IUsuarios[] = [{ id: 456 }];
        expectedResult = service.addUsuariosToCollectionIfMissing(usuariosCollection, usuarios);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(usuarios);
      });

      it('should add only unique Usuarios to an array', () => {
        const usuariosArray: IUsuarios[] = [{ id: 123 }, { id: 456 }, { id: 6696 }];
        const usuariosCollection: IUsuarios[] = [{ id: 123 }];
        expectedResult = service.addUsuariosToCollectionIfMissing(usuariosCollection, ...usuariosArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const usuarios: IUsuarios = { id: 123 };
        const usuarios2: IUsuarios = { id: 456 };
        expectedResult = service.addUsuariosToCollectionIfMissing([], usuarios, usuarios2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(usuarios);
        expect(expectedResult).toContain(usuarios2);
      });

      it('should accept null and undefined values', () => {
        const usuarios: IUsuarios = { id: 123 };
        expectedResult = service.addUsuariosToCollectionIfMissing([], null, usuarios, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(usuarios);
      });

      it('should return initial array if no Usuarios is added', () => {
        const usuariosCollection: IUsuarios[] = [{ id: 123 }];
        expectedResult = service.addUsuariosToCollectionIfMissing(usuariosCollection, undefined, null);
        expect(expectedResult).toEqual(usuariosCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
