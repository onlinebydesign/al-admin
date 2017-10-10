import { Query } from './../core/query.class';
import { Injectable } from '@angular/core';

import { UsersCollection } from './users.collection'; 

@Injectable()
export class UsersService {
  private queryFilter: Query;

  constructor() { }

  public fetch(filter?: Query) {
    if (filter) {
      this.queryFilter = new Query(filter);
    }

    if (this.queryFilter) {
      UsersCollection.queryFilter = this.queryFilter.formatQueryFilter();
    }

    UsersCollection.fetch();
  }

}
