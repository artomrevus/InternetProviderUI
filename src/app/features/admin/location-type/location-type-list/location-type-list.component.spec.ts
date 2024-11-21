import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationTypeListComponent } from './location-type-list.component';

describe('LocationTypeListComponent', () => {
  let component: LocationTypeListComponent;
  let fixture: ComponentFixture<LocationTypeListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LocationTypeListComponent]
    });
    fixture = TestBed.createComponent(LocationTypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
