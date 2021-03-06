import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AlAuthService } from 'al-core';

@Component({
  selector: 'al-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  private token: string;

  constructor(private route: ActivatedRoute, private authService: AlAuthService) {
    this.route.queryParams.subscribe(params => {
      this.token = params['resetToken'];
    });
  }

  ngOnInit() { }

  public resetPassword (newPassword: string, newPasswordConfirm: string) {
    this.authService.resetPassword(newPassword, newPasswordConfirm, this.token);
  }
}
