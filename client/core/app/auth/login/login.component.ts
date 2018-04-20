import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AuthService } from '../auth.service';

@Component({
  selector: 'al-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private route: ActivatedRoute, private authService: AuthService) {
  }

  public ngOnInit() {
    // Display the verified message.
    if (this.route.snapshot.data['verified']) {
      this.authService.verified();
    }
  }

  public login(email: string, password: string) {
    this.authService.login(email, password);
  }

  public logout() {
    this.authService.logout();
  }

}
