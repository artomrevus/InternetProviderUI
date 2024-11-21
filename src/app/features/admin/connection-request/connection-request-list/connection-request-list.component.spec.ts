import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectionRequestListComponent } from './connection-request-list.component';

describe('ConnectionRequestListComponent', () => {
  let component: ConnectionRequestListComponent;
  let fixture: ComponentFixture<ConnectionRequestListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConnectionRequestListComponent]
    });
    fixture = TestBed.createComponent(ConnectionRequestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
