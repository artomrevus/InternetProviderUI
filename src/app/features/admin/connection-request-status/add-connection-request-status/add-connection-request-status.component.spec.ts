import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddConnectionRequestStatusComponent } from './add-connection-request-status.component';

describe('AddConnectionRequestStatusComponent', () => {
  let component: AddConnectionRequestStatusComponent;
  let fixture: ComponentFixture<AddConnectionRequestStatusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddConnectionRequestStatusComponent]
    });
    fixture = TestBed.createComponent(AddConnectionRequestStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
