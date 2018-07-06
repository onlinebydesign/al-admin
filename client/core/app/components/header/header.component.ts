import {Component, OnInit} from '@angular/core';
import { AlAuthService, AlUser } from 'al-core';

@Component({
  selector: 'al-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  // public disabled = false;
  // public status: {isopen: boolean} = {isopen: false};
  //
  // public toggled(open: boolean): void {
  //   console.log('Dropdown is now: ', open);
  // }
  //
  // public toggleDropdown($event: MouseEvent): void {
  //   $event.preventDefault();
  //   $event.stopPropagation();
  //   this.status.isopen = !this.status.isopen;
  // }
  public user: AlUser;

  constructor(private authService: AlAuthService) {

  }

  ngOnInit(): void {
    this.authService.user$.subscribe(x => this.user = x);
  }

}
