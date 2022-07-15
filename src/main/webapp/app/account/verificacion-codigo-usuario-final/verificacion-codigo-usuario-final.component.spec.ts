import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificacionCodigoUsuarioFinalComponent } from './verificacion-codigo-usuario-final.component';

describe('VerificacionCodigoUsuarioFinalComponent', () => {
  let component: VerificacionCodigoUsuarioFinalComponent;
  let fixture: ComponentFixture<VerificacionCodigoUsuarioFinalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VerificacionCodigoUsuarioFinalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerificacionCodigoUsuarioFinalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
