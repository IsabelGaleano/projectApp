import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { IDonacionesPaquetes, DonacionesPaquetes } from '../donaciones-paquetes.model';
import { DonacionesPaquetesService } from '../service/donaciones-paquetes.service';

import { DonacionesPaquetesRoutingResolveService } from './donaciones-paquetes-routing-resolve.service';

describe('DonacionesPaquetes routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: DonacionesPaquetesRoutingResolveService;
  let service: DonacionesPaquetesService;
  let resultDonacionesPaquetes: IDonacionesPaquetes | undefined;

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
    routingResolveService = TestBed.inject(DonacionesPaquetesRoutingResolveService);
    service = TestBed.inject(DonacionesPaquetesService);
    resultDonacionesPaquetes = undefined;
  });

  describe('resolve', () => {
    it('should return IDonacionesPaquetes returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultDonacionesPaquetes = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultDonacionesPaquetes).toEqual({ id: 123 });
    });

    it('should return new IDonacionesPaquetes if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultDonacionesPaquetes = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultDonacionesPaquetes).toEqual(new DonacionesPaquetes());
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as DonacionesPaquetes })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultDonacionesPaquetes = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultDonacionesPaquetes).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
