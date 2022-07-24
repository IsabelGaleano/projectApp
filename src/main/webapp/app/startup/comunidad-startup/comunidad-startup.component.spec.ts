import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComunidadStartupComponent } from './comunidad-startup.component';

describe('ComunidadStartupComponent', () => {
  let component: ComunidadStartupComponent;
  let fixture: ComponentFixture<ComunidadStartupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ComunidadStartupComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComunidadStartupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
