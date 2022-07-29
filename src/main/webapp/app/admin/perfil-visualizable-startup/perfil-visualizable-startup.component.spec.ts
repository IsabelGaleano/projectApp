import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilVisualizableStartupComponent } from './perfil-visualizable-startup.component';

describe('PerfilVisualizableStartupComponent', () => {
  let component: PerfilVisualizableStartupComponent;
  let fixture: ComponentFixture<PerfilVisualizableStartupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PerfilVisualizableStartupComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilVisualizableStartupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
