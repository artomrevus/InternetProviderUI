import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLocationTypeComponent } from './edit-location-type.component';

describe('EditLocationTypeComponent', () => {
  let component: EditLocationTypeComponent;
  let fixture: ComponentFixture<EditLocationTypeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditLocationTypeComponent]
    });
    fixture = TestBed.createComponent(EditLocationTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
