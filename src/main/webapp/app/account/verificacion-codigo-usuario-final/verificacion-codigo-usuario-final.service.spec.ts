import { TestBed } from '@angular/core/testing';

import { VerificacionCodigoUsuarioFinalService } from './verificacion-codigo-usuario-final.service';

describe('VerificacionCodigoUsuarioFinalService', () => {
  let service: VerificacionCodigoUsuarioFinalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VerificacionCodigoUsuarioFinalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
