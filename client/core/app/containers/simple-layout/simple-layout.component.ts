import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  template: '<flash-messages></flash-messages><router-outlet></router-outlet>',
})
export class SimpleLayout implements OnInit {

  constructor() { }

  ngOnInit(): void { }
}
