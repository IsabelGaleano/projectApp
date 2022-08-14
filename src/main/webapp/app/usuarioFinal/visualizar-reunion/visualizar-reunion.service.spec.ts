import { TestBed } from '@angular/core/testing';

import { VisualizarReunionService } from './visualizar-reunion.service';

describe('VisualizarReunionService', () => {
  let service: VisualizarReunionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VisualizarReunionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
