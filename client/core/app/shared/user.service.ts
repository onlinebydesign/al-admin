import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User, defaultUser } from "./user.model";

@Injectable()
export class UserService {
  private userSubject: BehaviorSubject<User>;
  userObservable$: Observable<User>;

  constructor() {
    this.userSubject = new BehaviorSubject<User>(defaultUser);
    this.userObservable$ = this.userSubject.asObservable();
  }

  updateUser(user: User) {
    this.userSubject.next(user);
  }

}
