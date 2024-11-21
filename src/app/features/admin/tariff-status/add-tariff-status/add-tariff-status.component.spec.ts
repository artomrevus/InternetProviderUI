import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTariffStatusComponent } from './add-tariff-status.component';

describe('AddTariffStatusComponent', () => {
  let component: AddTariffStatusComponent;
  let fixture: ComponentFixture<AddTariffStatusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddTariffStatusComponent]
    });
    fixture = TestBed.createComponent(AddTariffStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
