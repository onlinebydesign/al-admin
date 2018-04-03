/* Copied from Guido Tapia @http://www.picnet.com.au/blogs/guido/2016/09/20/angular2-ng2-focus-directive/ 2018-04-03 */
import { Directive, DoCheck, AfterViewInit, ElementRef } from '@angular/core';

@Directive({
  selector: '[alFocus]'
})
export class AlFocusDirective implements AfterViewInit, DoCheck {

  private lastVisible: boolean = false;
  private initialised: boolean = false;

  constructor(private el: ElementRef) { }

  ngAfterViewInit() {
    this.initialised = true;
    this.ngDoCheck();
  }

  ngDoCheck() {
    if (!this.initialised) { return; }
    const visible = !!this.el.nativeElement.offsetParent;
    if (visible && !this.lastVisible) {
      setTimeout(() => this.el.nativeElement.focus(), 1);
    }
    this.lastVisible = visible;
  }
}
