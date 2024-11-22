import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewConnectionRequestComponent } from './new-connection-request.component';

describe('NewConnectionRequestComponent', () => {
  let component: NewConnectionRequestComponent;
  let fixture: ComponentFixture<NewConnectionRequestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewConnectionRequestComponent]
    });
    fixture = TestBed.createComponent(NewConnectionRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
