import { TestBed } from '@angular/core/testing';

import { StartupsPorCategoriaService } from './startups-por-categoria.service';

describe('StartupsPorCategoriaService', () => {
  let service: StartupsPorCategoriaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StartupsPorCategoriaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
