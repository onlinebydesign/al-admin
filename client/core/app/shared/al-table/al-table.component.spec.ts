import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlTableComponent } from './al-table.component';

describe('SearchListComponent', () => {
  let component: AlTableComponent;
  let fixture: ComponentFixture<AlTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
