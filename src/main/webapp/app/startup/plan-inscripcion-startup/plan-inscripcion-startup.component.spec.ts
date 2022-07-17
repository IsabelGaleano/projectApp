import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanInscripcionStartupComponent } from './plan-inscripcion-startup.component';

describe('PlanInscripcionStartupComponent', () => {
  let component: PlanInscripcionStartupComponent;
  let fixture: ComponentFixture<PlanInscripcionStartupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlanInscripcionStartupComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanInscripcionStartupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
