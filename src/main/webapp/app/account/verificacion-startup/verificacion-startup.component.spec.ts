import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificacionStartupComponent } from './verificacion-startup.component';

describe('VerificacionStartupComponent', () => {
  let component: VerificacionStartupComponent;
  let fixture: ComponentFixture<VerificacionStartupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VerificacionStartupComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerificacionStartupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
