import { TestBed } from '@angular/core/testing';

import { ComunidadStartupService } from './comunidad-startup.service';

describe('ComunidadStartupService', () => {
  let service: ComunidadStartupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComunidadStartupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
