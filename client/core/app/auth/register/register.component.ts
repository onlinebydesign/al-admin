import { Component, OnInit } from '@angular/core';

import { AlAuthService } from 'al-core';

@Component({
  selector: 'al-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private authService: AlAuthService) {}

  public register(email: string, password: string, passwordConfirm: string) {
    this.authService.register(email, password, passwordConfirm);
  }

  ngOnInit() {}

}
