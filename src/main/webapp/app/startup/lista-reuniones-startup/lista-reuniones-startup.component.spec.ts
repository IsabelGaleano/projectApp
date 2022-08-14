import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaReunionesStartupComponent } from './lista-reuniones-startup.component';

describe('ListaReunionesStartupComponent', () => {
  let component: ListaReunionesStartupComponent;
  let fixture: ComponentFixture<ListaReunionesStartupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListaReunionesStartupComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaReunionesStartupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
