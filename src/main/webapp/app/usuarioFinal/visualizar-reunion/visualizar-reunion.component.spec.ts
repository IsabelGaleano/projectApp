import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarReunionComponent } from './visualizar-reunion.component';

describe('VisualizarReunionComponent', () => {
  let component: VisualizarReunionComponent;
  let fixture: ComponentFixture<VisualizarReunionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VisualizarReunionComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizarReunionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
