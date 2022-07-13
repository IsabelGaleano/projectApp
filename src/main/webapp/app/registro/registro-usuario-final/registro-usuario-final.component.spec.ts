import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroUsuarioFinalComponent } from './registro-usuario-final.component';

describe('RegistroUsuarioFinalComponent', () => {
  let component: RegistroUsuarioFinalComponent;
  let fixture: ComponentFixture<RegistroUsuarioFinalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegistroUsuarioFinalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroUsuarioFinalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
