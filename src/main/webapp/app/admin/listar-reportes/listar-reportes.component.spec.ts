import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarReportesComponent } from './listar-reportes.component';

describe('ListarReportesComponent', () => {
  let component: ListarReportesComponent;
  let fixture: ComponentFixture<ListarReportesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListarReportesComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarReportesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
