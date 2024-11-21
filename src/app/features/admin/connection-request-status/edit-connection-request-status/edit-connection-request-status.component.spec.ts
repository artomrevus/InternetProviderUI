import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditConnectionRequestStatusComponent } from './edit-connection-request-status.component';

describe('EditConnectionRequestStatusComponent', () => {
  let component: EditConnectionRequestStatusComponent;
  let fixture: ComponentFixture<EditConnectionRequestStatusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditConnectionRequestStatusComponent]
    });
    fixture = TestBed.createComponent(EditConnectionRequestStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
