import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarPaquetesStartupComponent } from './registrar-paquetes-startup.component';

describe('RegistrarPaquetesStartupComponent', () => {
  let component: RegistrarPaquetesStartupComponent;
  let fixture: ComponentFixture<RegistrarPaquetesStartupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegistrarPaquetesStartupComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarPaquetesStartupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
