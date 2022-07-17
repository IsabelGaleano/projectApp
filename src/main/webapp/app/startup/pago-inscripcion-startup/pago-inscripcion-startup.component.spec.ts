import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagoInscripcionStartupComponent } from './pago-inscripcion-startup.component';

describe('PagoInscripcionStartupComponent', () => {
  let component: PagoInscripcionStartupComponent;
  let fixture: ComponentFixture<PagoInscripcionStartupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PagoInscripcionStartupComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PagoInscripcionStartupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
