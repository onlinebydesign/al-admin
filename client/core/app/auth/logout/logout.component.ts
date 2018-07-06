import { Component, OnInit } from '@angular/core';

import { AlAuthService } from 'al-core';

@Component({
  selector: 'al-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private authService: AlAuthService) { }

  ngOnInit() {
    this.authService.logout();
  }

}
