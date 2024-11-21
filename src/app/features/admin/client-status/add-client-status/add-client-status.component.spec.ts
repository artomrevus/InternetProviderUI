import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddClientStatusComponent } from './add-client-status.component';

describe('AddClientStatusComponent', () => {
  let component: AddClientStatusComponent;
  let fixture: ComponentFixture<AddClientStatusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddClientStatusComponent]
    });
    fixture = TestBed.createComponent(AddClientStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
