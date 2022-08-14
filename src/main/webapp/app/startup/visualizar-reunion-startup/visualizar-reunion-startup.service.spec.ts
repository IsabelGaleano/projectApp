import { TestBed } from '@angular/core/testing';

import { VisualizarReunionStartupService } from './visualizar-reunion-startup.service';

describe('VisualizarReunionStartupService', () => {
  let service: VisualizarReunionStartupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VisualizarReunionStartupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
