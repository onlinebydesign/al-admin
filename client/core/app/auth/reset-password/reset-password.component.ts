import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  private token: string;

  constructor(private route: ActivatedRoute, private authService: AuthService) {
    this.route.queryParams.subscribe(params => {
      this.token = params['access_token'];
    });
  }

  ngOnInit() { }

  public resetPassword (newPassword: string, newPasswordConfirm: string) {
    this.authService.resetPassword(newPassword, newPasswordConfirm, this.token);
  }
}
