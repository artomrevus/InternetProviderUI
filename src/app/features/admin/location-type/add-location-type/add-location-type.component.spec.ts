import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLocationTypeComponent } from './add-location-type.component';

describe('AddLocationTypeComponent', () => {
  let component: AddLocationTypeComponent;
  let fixture: ComponentFixture<AddLocationTypeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddLocationTypeComponent]
    });
    fixture = TestBed.createComponent(AddLocationTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
