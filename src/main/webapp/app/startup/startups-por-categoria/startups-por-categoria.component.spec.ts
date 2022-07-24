import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartupsPorCategoriaComponent } from './startups-por-categoria.component';

describe('StartupsPorCategoriaComponent', () => {
  let component: StartupsPorCategoriaComponent;
  let fixture: ComponentFixture<StartupsPorCategoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StartupsPorCategoriaComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StartupsPorCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
