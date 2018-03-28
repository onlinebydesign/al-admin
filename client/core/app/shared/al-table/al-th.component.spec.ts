import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlThComponent } from './al-th.component';

describe('ThSortableComponent', () => {
  let component: AlThComponent;
  let fixture: ComponentFixture<AlThComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlThComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlThComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
