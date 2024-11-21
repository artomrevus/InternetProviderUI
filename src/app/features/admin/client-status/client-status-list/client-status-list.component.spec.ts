import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientStatusListComponent } from './client-status-list.component';

describe('ClientStatusListComponent', () => {
  let component: ClientStatusListComponent;
  let fixture: ComponentFixture<ClientStatusListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientStatusListComponent]
    });
    fixture = TestBed.createComponent(ClientStatusListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
