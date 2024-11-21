import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectionRequestStatusListComponent } from './connection-request-status-list.component';

describe('ConnectionRequestStatusListComponent', () => {
  let component: ConnectionRequestStatusListComponent;
  let fixture: ComponentFixture<ConnectionRequestStatusListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConnectionRequestStatusListComponent]
    });
    fixture = TestBed.createComponent(ConnectionRequestStatusListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
