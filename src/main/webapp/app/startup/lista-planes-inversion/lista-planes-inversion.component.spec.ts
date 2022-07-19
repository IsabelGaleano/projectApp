import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaPlanesInversionComponent } from './lista-planes-inversion.component';

describe('ListaPlanesInversionComponent', () => {
  let component: ListaPlanesInversionComponent;
  let fixture: ComponentFixture<ListaPlanesInversionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListaPlanesInversionComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaPlanesInversionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
