import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Data } from './data';

@Injectable()
export class DataService {
  public data$: Observable<Data[]>;
  public dataSubject: BehaviorSubject<Data[]>;

  private data: Data[] = [];

  constructor() {
    this.dataSubject = new BehaviorSubject<Data[]>(this.data);
    this.data$ = this.dataSubject.asObservable();
  }

  public getById(id: string): Data {
    let foundData: Data;

    this.data.forEach((datum) => {
      if (datum.id === id) {
        foundData = datum;
      }
    });

    return foundData;
  }

  public save(data: Data) {
    const existingData = this.getById(data.id);

    if (!existingData) {
      return this.add(data);
    }

    existingData.data = data.data;
    existingData.formVersion = data.formVersion;
  }

  public add(data: Data) {

    // Add the created value with the current date.
    data.created = new Date();

    this.data.push(data);
    this.dataSubject.next(this.data);
  }

}
