import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilDonacionStartupComponent } from './perfil-donacion-startup.component';

describe('PerfilDonacionStartupComponent', () => {
  let component: PerfilDonacionStartupComponent;
  let fixture: ComponentFixture<PerfilDonacionStartupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PerfilDonacionStartupComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilDonacionStartupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
