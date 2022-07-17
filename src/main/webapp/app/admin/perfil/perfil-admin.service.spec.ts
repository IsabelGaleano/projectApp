import { TestBed } from '@angular/core/testing';

import { PerfilAdminService } from './perfil-admin.service';

describe('PerfilAdminService', () => {
  let service: PerfilAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PerfilAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
