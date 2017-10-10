import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar-left',
  templateUrl: './sidebar-left.component.html',
  styleUrls: ['./sidebar-left.component.scss']
})
export class SidebarLeftComponent implements OnInit {

  constructor(public router: Router) { 
    console.log(this.router.config);
  }

  ngOnInit() {
  }

}
