import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTariffComponent } from './add-tariff.component';

describe('AddTariffComponent', () => {
  let component: AddTariffComponent;
  let fixture: ComponentFixture<AddTariffComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddTariffComponent]
    });
    fixture = TestBed.createComponent(AddTariffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
