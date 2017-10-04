import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public settings: any = {};

  public credentials = {
    email: '',
    password: '',
  };

  constructor() {
    // this.store
    //   .select('app')
    //   .subscribe((res: any) => {
        // this.settings = res.settings

        if (this.settings.nodeEnv === 'development') {
          this.credentials.email = 'admin@example.com'
          this.credentials.password = 'password'
        }
      // })
  }

  public login() {
  }

  public ngOnInit() {
  }

}
