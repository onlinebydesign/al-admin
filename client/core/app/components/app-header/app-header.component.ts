import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html'
})
export class AppHeaderComponent implements OnInit {

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
  public user = {};

  constructor(private authService: AuthService) {

  }

  ngOnInit(): void {
    this.authService.user$.subscribe(x => this.user = x);
  }

}
