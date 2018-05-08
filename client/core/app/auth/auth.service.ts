import { Injectable } from '@angular/core';
import { Observable,  BehaviorSubject } from 'rxjs';

import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
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
      this.http.post('api/auth/login', { email: email, password: password })
        .subscribe((res: HttpResponse<any>) => {
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
    const accessToken = JSON.parse(localStorage.getItem('accessToken'));
    this.unsetAccessToken();

    if (accessToken) {
      this.http.post('api/auth/logout', {},
        { headers: new HttpHeaders({ 'Authorization': accessToken.id })})
        .subscribe((res: HttpResponse<any>) =>
          this.flashMessageService.show(
            'User successfully logged out!',
            { cssClass: 'alert-success', timeout: 2500 }
          )
        );
    }
  }

  public async register(email: string, password: string, passwordConfirm: string) {
    if (password !== passwordConfirm) {
      return this.flashMessageService.show('Passwords must match!');
    }

    this.flashMessageService.show(
      'Creating new user',
      { cssClass: 'alert-info', timeout: 2500 }
    );

    try {
      this.user = await this.createUser(email, password);
    } catch (e) {
      return this.flashMessageService.show(e.message, { cssClass: 'alert-danger' });
    }

    this.router.navigate([this.loginUrl]);
    setTimeout(() =>
      this.flashMessageService.show(
        'User successfully created you will receive a verification email shortly!',
        { cssClass: 'alert-success', timeout: 10000 }
      )
    );
  }

  public async resetPassword(newPassword: string, newPasswordConfirm: string, token: string) {
    if (newPassword !== newPasswordConfirm) {
      return this.flashMessageService.show('Passwords must match!');
    }

    try {
      await this.http.post(`api/auth/reset-password?resetToken=${encodeURIComponent(token)}`, { password: newPassword }).toPromise();
    } catch (e) {
      return this.flashMessageService.show(e.message, { cssClass: 'alert-danger' });
    }

    this.router.navigate([this.loginUrl]);
    setTimeout(() =>
      this.flashMessageService.show(
        'User successfully created you will be redirected to login!',
        { cssClass: 'alert-success', timeout: 10000 }
      )
    );
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
    this.http.post('api/auth/reset',
      { email: email })
      .subscribe((res: HttpResponse<any>) => this.recoverReply(res), res => this.recoverReply(res));
  }

  public verified() {
    setTimeout(() => {
      this.flashMessageService.show(
        'Your account has been verified. You can now login!',
        { cssClass: 'alert-info', timeout: 9500 }
      );
    });
  }

  public hasPermission(permission: string): boolean {
    const rolePermissionTree = {
      undefined: [],
      '': [''],
      'admin': ['ManageUsers', 'ManageData']
    };

    const permissions = rolePermissionTree[this.user.role];
    if (permissions) {
      return permissions.includes(permission);
    }

    return false;
  }

  private recoverReply(res: HttpResponse<any>) {
    this.router.navigate([this.loginUrl]);
    setTimeout(() =>
      this.flashMessageService.show(
        'Your request has been submitted an email should arrive shortly!',
        { cssClass: 'alert-info', timeout: 9500 }
      )
    );
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
    // Delete the local user.
    delete this.user;

    // Remove the access token from local storage.
    localStorage.removeItem('accessToken');

    // Redirect to the login page.
    this.router.navigate([this.loginUrl]);
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

  private async createUser(email: string, password: string): Promise<User> {
    const response = await this.http.post('api/auth', { email: email, password: password }).toPromise();
    return new UserModel(response);
  }

}
