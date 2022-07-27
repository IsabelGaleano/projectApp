import { TestBed } from '@angular/core/testing';

import { PerfilVisualizableStartupService } from './perfil-visualizable-startup.service';

describe('PerfilVisualizableStartupService', () => {
  let service: PerfilVisualizableStartupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PerfilVisualizableStartupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
