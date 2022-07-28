import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroEnvioPaquetesComponent } from './registro-envio-paquetes.component';

describe('RegistroEnvioPaquetesComponent', () => {
  let component: RegistroEnvioPaquetesComponent;
  let fixture: ComponentFixture<RegistroEnvioPaquetesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegistroEnvioPaquetesComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroEnvioPaquetesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
