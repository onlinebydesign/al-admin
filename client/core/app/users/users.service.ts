import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/takeWhile';

import { LoopbackQuery } from '../core/query.class';
import { UsersCollection } from './users.collection';
import { EmptyUser, User, UserModel } from './user.model';


@Injectable()
export class UsersService {
  public users$: Observable<User[]>;
  public usersSubject: BehaviorSubject<User[]>;

  private usersCollection: any; // TODO: change to Al-Model
  private queryFilter: LoopbackQuery;

  constructor() {
    this.usersSubject = new BehaviorSubject<User[]>([]);
    this.users$ = this.usersSubject.asObservable();

    this.usersCollection = new UsersCollection();
    this.usersCollection.on('sync', (obj, res, options) => {
      // TODO: the sync event could be the collection or a model.
      let models = [];
      if (obj.isCollection) {
        models = obj.models;
      } else if (obj.collection) {
        models = obj.collection.models;
      }

      this.usersSubject.next(models)
    });
  }

  public fetch(filter?: LoopbackQuery) {
    if (filter) {
      this.queryFilter = new LoopbackQuery(filter);
    }

    if (this.queryFilter) {
      this.usersCollection.queryFilter = this.queryFilter.format();
    }

    this.usersCollection.fetch({
      success: function() {
        console.log(arguments);
      }
    });
  }

  public save(user: User): Observable<User> {
    return Observable.create((observer) => {
      user.save(null, {
        patch: true,
        success: (returnedUser: User) => {
          observer.next(returnedUser);
          observer.complete();
        }
      });
    })
  }

  public delete(user: User): Observable<User> {
    return Observable.create((observer) => {
      let done = false;
      let newSync = false;

      user.destroy({
        success: (returnedUser: User) => {
          this.fetch();
          this.users$.takeWhile(() => done === false).subscribe(() => {
            if (newSync === false) {
              return newSync = true;
            }

            done = true;
            observer.next(returnedUser);
            observer.complete();
          });
        }
      });
    })
  }

  public add(email: string, password: string): Observable<User> {
    return Observable.create((observer) => {
      let done = false;
      let newSync = false;
      const user = new UserModel({email: email, password: password});
      user.save(null, {
        success: (returnedUser: User) => {
          this.usersCollection.add(returnedUser);
          this.fetch();
          this.users$.takeWhile(() => done === false).subscribe(() => {
            if (newSync === false) {
              return newSync = true;
            }

            done = true;
            observer.next(returnedUser);
            observer.complete();
          });
        }
      });
    })
  }
}
