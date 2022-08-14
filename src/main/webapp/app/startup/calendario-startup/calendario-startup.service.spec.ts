import { TestBed } from '@angular/core/testing';

import { CalendarioStartupService } from './calendario-startup.service';

describe('CalendarioStartupService', () => {
  let service: CalendarioStartupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalendarioStartupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
