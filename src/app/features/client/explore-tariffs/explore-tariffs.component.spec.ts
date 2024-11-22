import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExploreTariffsComponent } from './explore-tariffs.component';

describe('ExploreTariffsComponent', () => {
  let component: ExploreTariffsComponent;
  let fixture: ComponentFixture<ExploreTariffsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExploreTariffsComponent]
    });
    fixture = TestBed.createComponent(ExploreTariffsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
