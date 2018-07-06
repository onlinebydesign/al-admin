import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlCoreComponent } from './al-core.component';

describe('AlCoreComponent', () => {
  let component: AlCoreComponent;
  let fixture: ComponentFixture<AlCoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlCoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlCoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
