import { Injectable } from '@angular/core';
import { BehaviorSubject,  Observable } from 'rxjs';
import { takeWhile } from 'rxjs/operators';

import { AlUser, AlUserModel, LoopbackQuery } from 'al-core';

import { UsersCollection } from './users.collection';


@Injectable()
export class UsersService {
  public users$: Observable<AlUser[]>;
  public usersSubject: BehaviorSubject<AlUser[]>;

  private usersCollection: any; // TODO: change to Al-Model
  private queryFilter: LoopbackQuery;

  constructor() {
    this.usersSubject = new BehaviorSubject<AlUser[]>([]);
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

  public save(user: AlUser): Observable<AlUser> {
    return Observable.create((observer) => {
      user.save(null, {
        patch: true,
        success: (returnedUser: AlUser) => {
          observer.next(returnedUser);
          observer.complete();
        }
      });
    })
  }

  public delete(user: AlUser): Observable<AlUser> {
    return Observable.create((observer) => {
      let done = false;
      let newSync = false;

      user.destroy({
        success: (returnedUser: AlUser) => {
          this.fetch();
          this.users$.pipe(takeWhile(() => done === false)).subscribe(() => {
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

  public add(email: string, password: string): Observable<AlUser> {
    return Observable.create((observer) => {
      let done = false;
      let newSync = false;
      const user = new AlUserModel({email: email, password: password});
      user.save(null, {
        success: (returnedUser: AlUser) => {
          this.usersCollection.add(returnedUser);
          this.fetch();
          this.users$.pipe(takeWhile(() => done === false)).subscribe(() => {
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
