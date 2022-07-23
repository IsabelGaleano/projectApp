import { TestBed } from '@angular/core/testing';

import { PerfilComercialStartupService } from './perfil-comercial-startup.service';

describe('PerfilComercialStartupService', () => {
  let service: PerfilComercialStartupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PerfilComercialStartupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
