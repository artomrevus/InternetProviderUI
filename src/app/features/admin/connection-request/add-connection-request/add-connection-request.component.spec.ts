import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddConnectionRequestComponent } from './add-connection-request.component';

describe('AddConnectionRequestComponent', () => {
  let component: AddConnectionRequestComponent;
  let fixture: ComponentFixture<AddConnectionRequestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddConnectionRequestComponent]
    });
    fixture = TestBed.createComponent(AddConnectionRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
