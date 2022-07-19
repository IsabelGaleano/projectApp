import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarPaquetesStartupComponent } from './listar-paquetes-startup.component';

describe('ListarPaquetesStartupComponent', () => {
  let component: ListarPaquetesStartupComponent;
  let fixture: ComponentFixture<ListarPaquetesStartupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListarPaquetesStartupComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarPaquetesStartupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
