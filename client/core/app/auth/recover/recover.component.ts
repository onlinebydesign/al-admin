import { Component, OnInit } from '@angular/core';

import { AlAuthService } from 'al-core';

@Component({
  selector: 'al-recover',
  templateUrl: './recover.component.html',
  styleUrls: ['./recover.component.scss']
})
export class RecoverComponent implements OnInit {

  constructor(
    private authService: AlAuthService,
  ) {}

  public ngOnInit() {

  }

  public recover(email: string) {
    this.authService.recover(email)
  }
}
