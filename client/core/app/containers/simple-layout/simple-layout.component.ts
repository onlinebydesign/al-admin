import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  template: '<flash-messages></flash-messages><router-outlet></router-outlet>',
})
export class SimpleLayoutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void { }
}
