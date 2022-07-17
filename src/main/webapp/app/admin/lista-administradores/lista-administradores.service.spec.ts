import { TestBed } from '@angular/core/testing';

import { ListaAdministradoresService } from './lista-administradores.service';

describe('ListaAdministradoresService', () => {
  let service: ListaAdministradoresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListaAdministradoresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
