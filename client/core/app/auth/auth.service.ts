import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
import { Router } from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { FlashMessagesService } from 'angular2-flash-messages';

import { EmptyUser, User, UserModel } from '../users/user.model';

@Injectable()
export class AuthService {

  // public user = new UserModel();

  private userSubject: BehaviorSubject<User>;
  public user$: Observable<User>;

  public user;

  public accessToken;
  //  = {
  //   userId: '',
  //   id: ''
  // };

  public redirectUrl = '/';
  public loginUrl = '/auth/login';

  constructor(
    private http: HttpClient, 
    private router: Router, 
    private flashMessageService: FlashMessagesService
  ) {
    this.userSubject = new BehaviorSubject<User>(EmptyUser);
    this.user$ = this.userSubject.asObservable();

    this.setAccessToken();
  }

  /**
   * Login and load the user
   *
   * @param {string} email
   * @param {string} password
   * @returns {any}
   */
  public login(email: string, password: string) {

    // If email and password are provided then login
    if (email && password) {
      // First attempt to login as an employee
      this.http.post('api/users/login', { email: email, password: password })
        .subscribe((res: string) => {
        localStorage.setItem('accessToken', JSON.stringify(res));

        this.setAccessToken();
        this.router.navigate([this.redirectUrl]);
      }, err => {
        this.flashMessageService.show(err.message);
      });
    }
  }

  public logout(): void {
    delete this.user;
    localStorage.removeItem('accessToken');

    this.router.navigate([this.loginUrl]);
    this.flashMessageService.show('You have been logged out!', { cssClass: 'alert-success' });
  }

  public register(email: string, password: string, passwordConfirm: string) {
    if (password !== passwordConfirm) {
      return this.flashMessageService.show('Passwords must match!');
    }

    this.user = new UserModel({email: email, password: password});
    this.user.save(null, {
      success: () => {
        this.userSubject.next(this.user);
        this.flashMessageService.show(
          'User successfully created you will be redirected to login!', 
          { cssClass: 'alert-success', timeout: 2500 }
        );

        // Wait for the flash message to disappear before re-routing to the login page.
        setTimeout(() => {
          this.router.navigate([this.loginUrl]);
        }, 2500);
      },
      error: (model, res) => {
        this.flashMessageService.show(res.body.error.message);
      }
    });
  }

  /**
   * Checks to see if the user is logged in.
   * 
   * @returns {boolean}
   */
  public isLoggedIn(): boolean {
    return !!this.accessToken;
  }

  /**
   * Take the access token from localStorage and attach the token and user id to the user.
   * 
   * @returns {boolean}
   */
  private setAccessToken(): boolean {
    this.accessToken = JSON.parse(localStorage.getItem('accessToken'));

    // If there is an accessToken then load the user
    if (this.accessToken && this.accessToken.userId && this.accessToken.id) {
      if (!this.user) {
        this.user = new UserModel();
      }

      this.user.id = this.accessToken.userId;

      this.user.ajaxConfig = {
        headers: {
          'Authorization': this.accessToken.id
        }
      }

      // After loading the access token and setting up the user we can get the user.
      this.get();

      return true;
    }

    return false;
  }
  /**
   * Fetches the user and returns the user observable
   *
   * @returns {Observable<User>}
   */
  private get(): Observable<User> {
    this.user.fetch({
      success: () => {
        this.userSubject.next(this.user);
        this.flashMessageService.show('You have successfully logged in!', { cssClass: 'alert-success', timeout: 1000 });
      },
      error: (model, res) => {
        //TODO: Figure out what body isn't parsed.
        res.body = JSON.parse(res.body);
        if (this.flashMessageService.show) {
          this.flashMessageService.show(res.body.error.message, { timeout: 2500 });
        }
        setTimeout(() => {
          this.logout();          
        }, 2500);
      }
    });

    return this.user$;
  }

}
