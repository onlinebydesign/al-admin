import { Component, OnInit } from '@angular/core';

import { AuthService } from './../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private authService: AuthService) {}

  public register(email: string, password: string, passwordConfirm: string) {
    this.authService.register(email, password, passwordConfirm);
  }

  ngOnInit() {}

}
