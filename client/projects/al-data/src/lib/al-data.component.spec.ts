import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlDataComponent } from './al-data.component';

describe('AlDataComponent', () => {
  let component: AlDataComponent;
  let fixture: ComponentFixture<AlDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
