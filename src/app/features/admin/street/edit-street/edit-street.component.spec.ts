import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditStreetComponent } from './edit-street.component';

describe('EditStreetComponent', () => {
  let component: EditStreetComponent;
  let fixture: ComponentFixture<EditStreetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditStreetComponent]
    });
    fixture = TestBed.createComponent(EditStreetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
