import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';

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
