import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditClientStatusComponent } from './edit-client-status.component';

describe('EditClientStatusComponent', () => {
  let component: EditClientStatusComponent;
  let fixture: ComponentFixture<EditClientStatusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditClientStatusComponent]
    });
    fixture = TestBed.createComponent(EditClientStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
