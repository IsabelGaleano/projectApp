import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaDonacionesStartupComponent } from './lista-donaciones-startup.component';

describe('ListaDonacionesStartupComponent', () => {
  let component: ListaDonacionesStartupComponent;
  let fixture: ComponentFixture<ListaDonacionesStartupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListaDonacionesStartupComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaDonacionesStartupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
