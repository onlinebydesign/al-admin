import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth.service';

@Component({
  selector: 'al-recover',
  templateUrl: './recover.component.html',
  styleUrls: ['./recover.component.scss']
})
export class RecoverComponent implements OnInit {

  constructor(
    private authService: AuthService,
  ) {}

  public ngOnInit() {

  }

  public recover(email: string) {
    this.authService.recover(email)
  }
}
