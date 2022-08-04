import { TestBed } from '@angular/core/testing';

import { PerfilVisualizableUsuarioFinalService } from './perfil-visualizable-usuario-final.service';

describe('PerfilVisualizableUsuarioFinalService', () => {
  let service: PerfilVisualizableUsuarioFinalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PerfilVisualizableUsuarioFinalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
