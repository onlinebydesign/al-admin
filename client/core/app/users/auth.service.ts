import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

import {EmptyUser, User, UserModel} from './user.model';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class AuthService {

  // public user = new UserModel();

  private userSubject: BehaviorSubject<User>;
  public user$: Observable<User>;
  private url = 'http://localhost:3000/api/Users/1?access_token=tBtiyF84sALTRJ7HjRyGvyQiWCTgiY118NzQEi3e73qFvbootVUlcrpE4WNEf0Tj';

  public user = new UserModel();

  constructor(private http: HttpClient) {
    this.userSubject = new BehaviorSubject<User>(EmptyUser);
    this.user$ = this.userSubject.asObservable();
    // this.login();

    this.user.fetch();
  }

  public login(): void {
    this.http.get<User>(this.url).subscribe(x => this.userSubject.next(x));
  }
}
