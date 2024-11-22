import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientAuthOptionsComponent } from './client-auth-options.component';

describe('ClientAuthOptionsComponent', () => {
  let component: ClientAuthOptionsComponent;
  let fixture: ComponentFixture<ClientAuthOptionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientAuthOptionsComponent]
    });
    fixture = TestBed.createComponent(ClientAuthOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
