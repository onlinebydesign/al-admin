import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { LoopbackQuery } from './../core/query.class';
import { Injectable } from '@angular/core';

import { UsersCollection } from './users.collection';
import { EmptyUser, User, UserModel } from './user.model';


@Injectable()
export class UsersService {
  public users = new UsersCollection();
  public users$: Observable<User[]>;
  public usersSubject: BehaviorSubject<User[]>;

  private queryFilter: LoopbackQuery;

  constructor() {
    this.usersSubject = new BehaviorSubject<User[]>([]);
    this.users$ = this.usersSubject.asObservable();
    this.users.on('sync', (collection, res, options) => this.usersSubject.next(collection.models));
  }

  public fetch(filter?: LoopbackQuery) {
    if (filter) {
      this.queryFilter = new LoopbackQuery(filter);
    }

    if (this.queryFilter) {
      UsersCollection.queryFilter = this.queryFilter.format();
    }

    UsersCollection.fetch();
  }
  
}
