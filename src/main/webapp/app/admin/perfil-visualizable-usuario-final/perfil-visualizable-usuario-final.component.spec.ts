import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilVisualizableUsuarioFinalComponent } from './perfil-visualizable-usuario-final.component';

describe('PerfilVisualizableUsuarioFinalComponent', () => {
  let component: PerfilVisualizableUsuarioFinalComponent;
  let fixture: ComponentFixture<PerfilVisualizableUsuarioFinalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PerfilVisualizableUsuarioFinalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilVisualizableUsuarioFinalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
