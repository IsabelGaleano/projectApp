import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarReunionStartupComponent } from './visualizar-reunion-startup.component';

describe('VisualizarReunionStartupComponent', () => {
  let component: VisualizarReunionStartupComponent;
  let fixture: ComponentFixture<VisualizarReunionStartupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VisualizarReunionStartupComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizarReunionStartupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
