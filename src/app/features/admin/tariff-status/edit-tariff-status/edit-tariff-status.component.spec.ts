import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTariffStatusComponent } from './edit-tariff-status.component';

describe('EditTariffStatusComponent', () => {
  let component: EditTariffStatusComponent;
  let fixture: ComponentFixture<EditTariffStatusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditTariffStatusComponent]
    });
    fixture = TestBed.createComponent(EditTariffStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
