import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarPlanInversionComponent } from './actualizar-plan-inversion.component';

describe('ActualizarPlanInversionComponent', () => {
  let component: ActualizarPlanInversionComponent;
  let fixture: ComponentFixture<ActualizarPlanInversionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActualizarPlanInversionComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualizarPlanInversionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
