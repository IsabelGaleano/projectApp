import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroAdicionalStartupComponent } from './registro-adicional-startup.component';

describe('RegistroAdicionalStartupComponent', () => {
  let component: RegistroAdicionalStartupComponent;
  let fixture: ComponentFixture<RegistroAdicionalStartupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegistroAdicionalStartupComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroAdicionalStartupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
