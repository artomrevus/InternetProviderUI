import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientConnectionRequestsComponent } from './client-connection-requests.component';

describe('ClientConnectionRequestsComponent', () => {
  let component: ClientConnectionRequestsComponent;
  let fixture: ComponentFixture<ClientConnectionRequestsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientConnectionRequestsComponent]
    });
    fixture = TestBed.createComponent(ClientConnectionRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
