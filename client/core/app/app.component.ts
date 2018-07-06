import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { AlAuthService } from 'al-core';

@Component({
  // tslint:disable-next-line
  selector: 'body',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent implements OnInit {
  private loginUrl = '/auth/login';
  private authUrl = '/auth/';

  constructor (private authService: AlAuthService, private router: Router) { }

  ngOnInit() {
    // Redirect if not logged in and not on the login or register pages.
    if (!window.location.pathname.includes(this.authUrl) && !this.authService.isLoggedIn()) {
      this.router.navigate([this.loginUrl]);
    }
  }
}
