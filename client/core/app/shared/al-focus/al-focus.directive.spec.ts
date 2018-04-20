import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementRef, Component } from '@angular/core';

import { AlFocusDirective } from './al-focus.directive';

class MockElementRef extends ElementRef { nativeElement = {}; }

describe('AlFocusDirective', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: ElementRef, useClass: MockElementRef }
      ]
    }).compileComponents();
  }));

  it('should create an instance', () => {
    // const directive = new AlFocusDirective();
    // expect(directive).toBeTruthy();
  });
});
