import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TariffStatusListComponent } from './tariff-status-list.component';

describe('TariffStatusListComponent', () => {
  let component: TariffStatusListComponent;
  let fixture: ComponentFixture<TariffStatusListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TariffStatusListComponent]
    });
    fixture = TestBed.createComponent(TariffStatusListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
