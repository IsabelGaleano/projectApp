import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarioInversionistaComponent } from './calendario-inversionista.component';

describe('CalendarioInversionistaComponent', () => {
  let component: CalendarioInversionistaComponent;
  let fixture: ComponentFixture<CalendarioInversionistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CalendarioInversionistaComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarioInversionistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
