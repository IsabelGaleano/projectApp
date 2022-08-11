import { TestBed } from '@angular/core/testing';

import { ListaReunionesStartupService } from './lista-reuniones-startup.service';

describe('ListaReunionesStartupService', () => {
  let service: ListaReunionesStartupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListaReunionesStartupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
