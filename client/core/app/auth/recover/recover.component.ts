import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recover',
  templateUrl: './recover.component.html',
  styleUrls: ['./recover.component.scss']
})
export class RecoverComponent implements OnInit {

  public user: any = {
    email: '',
  }

  constructor(
    // private authService: AuthService,
  ) {}
  public ngOnInit() {

  }

  public recover() {
    // this.authService.recover(this.user)
  }
}
