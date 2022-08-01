import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaDonacionesUsuarioComponent } from './lista-donaciones-usuario.component';

describe('ListaDonacionesUsuarioComponent', () => {
  let component: ListaDonacionesUsuarioComponent;
  let fixture: ComponentFixture<ListaDonacionesUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListaDonacionesUsuarioComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaDonacionesUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
