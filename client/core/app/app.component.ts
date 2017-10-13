import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { AuthService } from './auth/auth.service';

@Component({
  // tslint:disable-next-line
  selector: 'body',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent implements OnInit {
  private loginUrl = '/auth/login';
  private registerUrl = '/auth/register';

  constructor (private authService: AuthService, private router: Router) { }
  
  ngOnInit() {
    // Redirect if not logged in and not on the login or register pages.
    if ((this.router.url !== this.loginUrl || this.router.url !== this.registerUrl) && !this.authService.isLoggedIn()) {
      this.router.navigate([this.loginUrl]);
    }
  }
}
