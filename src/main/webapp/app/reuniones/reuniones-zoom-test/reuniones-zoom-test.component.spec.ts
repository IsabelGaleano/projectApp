import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReunionesZoomTestComponent } from './reuniones-zoom-test.component';

describe('ReunionesZoomTestComponent', () => {
  let component: ReunionesZoomTestComponent;
  let fixture: ComponentFixture<ReunionesZoomTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReunionesZoomTestComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReunionesZoomTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
