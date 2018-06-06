import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportCreatorComponent } from './report-creator.component';

describe('ReportCreatorComponent', () => {
  let component: ReportCreatorComponent;
  let fixture: ComponentFixture<ReportCreatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportCreatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
