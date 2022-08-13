import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarReportesStartupComponent } from './listar-reportes-startup.component';

describe('ListarReportesStartupComponent', () => {
  let component: ListarReportesStartupComponent;
  let fixture: ComponentFixture<ListarReportesStartupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListarReportesStartupComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarReportesStartupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
