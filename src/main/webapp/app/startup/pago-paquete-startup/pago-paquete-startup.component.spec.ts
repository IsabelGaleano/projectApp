import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagoPaqueteStartupComponent } from './pago-paquete-startup.component';

describe('PagoPaqueteStartupComponent', () => {
  let component: PagoPaqueteStartupComponent;
  let fixture: ComponentFixture<PagoPaqueteStartupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PagoPaqueteStartupComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PagoPaqueteStartupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
