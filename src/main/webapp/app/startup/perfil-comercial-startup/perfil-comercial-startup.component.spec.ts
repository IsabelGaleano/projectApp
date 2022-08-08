import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilComercialStartupComponent } from './perfil-comercial-startup.component';

describe('PerfilComercialStartupComponent', () => {
  let component: PerfilComercialStartupComponent;
  let fixture: ComponentFixture<PerfilComercialStartupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PerfilComercialStartupComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilComercialStartupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
