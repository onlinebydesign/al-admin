import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlFormlyRepeatComponent } from './al-formly-repeat.component';

describe('AlFormlyRepeatComponent', () => {
  let component: AlFormlyRepeatComponent;
  let fixture: ComponentFixture<AlFormlyRepeatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlFormlyRepeatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlFormlyRepeatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
