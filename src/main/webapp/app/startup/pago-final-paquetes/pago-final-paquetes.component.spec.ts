import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagoFinalPaquetesComponent } from './pago-final-paquetes.component';

describe('PagoFinalPaquetesComponent', () => {
  let component: PagoFinalPaquetesComponent;
  let fixture: ComponentFixture<PagoFinalPaquetesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PagoFinalPaquetesComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PagoFinalPaquetesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
