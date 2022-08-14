import { TestBed } from '@angular/core/testing';

import { CalendarioInversionistaService } from './calendario-inversionista.service';

describe('CalendarioInversionistaService', () => {
  let service: CalendarioInversionistaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalendarioInversionistaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
