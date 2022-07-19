import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilVisualizableAdminComponent } from './perfil-visualizable-admin.component';

describe('PerfilVisualizableAdminComponent', () => {
  let component: PerfilVisualizableAdminComponent;
  let fixture: ComponentFixture<PerfilVisualizableAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PerfilVisualizableAdminComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilVisualizableAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
