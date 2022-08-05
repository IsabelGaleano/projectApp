import { TestBed } from '@angular/core/testing';

import { ReunionesZoomTestService } from './reuniones-zoom-test.service';

describe('ReunionesZoomTestService', () => {
  let service: ReunionesZoomTestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReunionesZoomTestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
