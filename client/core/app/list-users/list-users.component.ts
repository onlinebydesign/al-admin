import { Component, OnInit } from '@angular/core';
import { UserService } from "../shared/user.service";
import { User } from "../shared/user.model";

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit {
  currentUser: User;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.userObservable$.subscribe(x => this.currentUser = x)
  }

  updateEmail() {
    let newUser: User = {
      email: "arst@dev2.org",
      firstName: "arst",
      lastName: "asdf"
    };

    this.userService.updateUser(newUser);
  }
}
