import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { IRolesUsuarios, RolesUsuarios } from '../roles-usuarios.model';
import { RolesUsuariosService } from '../service/roles-usuarios.service';

import { RolesUsuariosRoutingResolveService } from './roles-usuarios-routing-resolve.service';

describe('RolesUsuarios routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: RolesUsuariosRoutingResolveService;
  let service: RolesUsuariosService;
  let resultRolesUsuarios: IRolesUsuarios | undefined;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({}),
            },
          },
        },
      ],
    });
    mockRouter = TestBed.inject(Router);
    jest.spyOn(mockRouter, 'navigate').mockImplementation(() => Promise.resolve(true));
    mockActivatedRouteSnapshot = TestBed.inject(ActivatedRoute).snapshot;
    routingResolveService = TestBed.inject(RolesUsuariosRoutingResolveService);
    service = TestBed.inject(RolesUsuariosService);
    resultRolesUsuarios = undefined;
  });

  describe('resolve', () => {
    it('should return IRolesUsuarios returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultRolesUsuarios = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultRolesUsuarios).toEqual({ id: 123 });
    });

    it('should return new IRolesUsuarios if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultRolesUsuarios = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultRolesUsuarios).toEqual(new RolesUsuarios());
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as RolesUsuarios })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultRolesUsuarios = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultRolesUsuarios).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
