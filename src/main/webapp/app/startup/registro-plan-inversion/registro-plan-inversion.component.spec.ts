import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroPlanInversionComponent } from './registro-plan-inversion.component';

describe('RegistroPlanInversionComponent', () => {
  let component: RegistroPlanInversionComponent;
  let fixture: ComponentFixture<RegistroPlanInversionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegistroPlanInversionComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroPlanInversionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
