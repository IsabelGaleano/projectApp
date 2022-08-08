import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilDonacionUsuarioComponent } from './perfil-donacion-usuario.component';

describe('PerfilDonacionUsuarioComponent', () => {
  let component: PerfilDonacionUsuarioComponent;
  let fixture: ComponentFixture<PerfilDonacionUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PerfilDonacionUsuarioComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilDonacionUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
