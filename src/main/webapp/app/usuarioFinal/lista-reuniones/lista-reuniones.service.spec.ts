import { TestBed } from '@angular/core/testing';

import { ListaReunionesService } from './lista-reuniones.service';

describe('ListaReunionesService', () => {
  let service: ListaReunionesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListaReunionesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
