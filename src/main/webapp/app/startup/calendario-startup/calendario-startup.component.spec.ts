import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarioStartupComponent } from './calendario-startup.component';

describe('CalendarioStartupComponent', () => {
  let component: CalendarioStartupComponent;
  let fixture: ComponentFixture<CalendarioStartupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CalendarioStartupComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarioStartupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
