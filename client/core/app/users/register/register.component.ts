import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public settings: any

  public credentials = {
    email: '',
    username: '',
    firstName: '',
    lastName: '',
    password: '',
    confirm: '',
  }

  constructor() {}

  public register() {}

  ngOnInit() {}

}
