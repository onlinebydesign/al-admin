import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService) {
  }

  public ngOnInit() {
  }

  public login(email: string, password: string) {
    this.authService.login(email, password);
  }

  public logout() {
    this.authService.logout();
  }

}
