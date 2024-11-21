import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStreetComponent } from './add-street.component';

describe('AddStreetComponent', () => {
  let component: AddStreetComponent;
  let fixture: ComponentFixture<AddStreetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddStreetComponent]
    });
    fixture = TestBed.createComponent(AddStreetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
