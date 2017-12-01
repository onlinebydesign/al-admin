import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
import { Http, Headers, Response } from '@angular/http';
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
    private http: Http,
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
      this.http.post('api/users/login', { email: email, password: password })
        .subscribe((res: Response) => {
        localStorage.setItem('accessToken', JSON.stringify(res));

        this.setAccessToken().subscribe(() => {
          this.router.navigate([this.redirectUrl]);
        });
      }, err => {
        this.flashMessageService.show('Incorrect username or password', { cssClass: 'alert-danger', timeout: 5000 });
      });
    } else {
      this.flashMessageService.show('Please enter a username and password', { cssClass: 'alert-danger' });
    }
  }

  public logout(): void {
    this.http.post('api/users/logout', {},
      {headers: new Headers({'Authorization': JSON.parse(localStorage.getItem('accessToken')).id})})
    .subscribe((res: Response) => this.unsetAccessToken());
  }

  public register(email: string, password: string, passwordConfirm: string) {
    if (password !== passwordConfirm) {
      return this.flashMessageService.show('Passwords must match!');
    }

    this.flashMessageService.show(
      'Creating new user',
      { cssClass: 'alert-info', timeout: 2500 }
    );

    this.user = new UserModel({email: email, password: password});
    this.user.save(null, {
      success: () => {
        this.flashMessageService.show(
          'User successfully created you will be redirected to login!',
          { cssClass: 'alert-success', timeout: 2500 }
        );

        // Wait for the flash message to disappear before re-routing to the login page.
        setTimeout(() => {
          this.router.navigate([this.loginUrl]);
        }, 2750);
      },
      error: (model, res) => {
        this.flashMessageService.show(res.body.error.message, { cssClass: 'alert-danger' });
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

  public recover(email: string) {
  // We always give the same reply regardless of the results from the server.
  this.http.post('api/users/reset',
    {email: email})
  .subscribe(res => this.recoverReply(res), res => this.recoverReply(res));
  }

  private recoverReply(res: Response) {
    this.flashMessageService.show('Your request has been submitted an email should arrive shortly!', { cssClass: 'alert-info', timeout: 2500 });

    setTimeout(() => {
      this.router.navigate([this.loginUrl]);
    }, 2750);
  }

  /**
   * Take the access token from localStorage and attach the token and user id to the user.
   *
   * @returns {Observable<User>}
   */
  private setAccessToken(): Observable<User> {
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
    }

    return this.user$;
  }

  /**
   * Remove the access token from local storage and remove user.
   *
   * @returns {Observable<User>}
   */
  private unsetAccessToken(): void {
    this.flashMessageService.show('You have been logged out!', { cssClass: 'alert-info', timeout: 2500 });
    
    delete this.user;
    localStorage.removeItem('accessToken');
    setTimeout(() => {
      this.router.navigate([this.loginUrl]);
    }, 2750);
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
      },
      error: (model, res) => {
        // TODO: Figure out what body isn't parsed.
        res.body = JSON.parse(res.body);
        if (this.flashMessageService.show) {
          this.flashMessageService.show(res.body.error.message, { cssClass: 'alert-danger', timeout: 2500 });
        }
        setTimeout(() => {
          this.unsetAccessToken();
        }, 2500);
      }
    });

    return this.user$;
  }

}
