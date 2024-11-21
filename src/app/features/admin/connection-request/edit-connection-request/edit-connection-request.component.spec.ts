import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditConnectionRequestComponent } from './edit-connection-request.component';

describe('EditConnectionRequestComponent', () => {
  let component: EditConnectionRequestComponent;
  let fixture: ComponentFixture<EditConnectionRequestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditConnectionRequestComponent]
    });
    fixture = TestBed.createComponent(EditConnectionRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
