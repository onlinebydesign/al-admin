import { Injectable } from '@angular/core';

import { DataForm } from './data-form';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class DataFormsService {
  public forms$: Observable<DataForm[]>;
  public formsSubject: BehaviorSubject<DataForm[]>;

  private forms: DataForm[] = [];

  constructor() {
    this.formsSubject = new BehaviorSubject<DataForm[]>(this.forms);
    this.forms$ = this.formsSubject.asObservable();
  }

  getById(id: string): DataForm {
    let foundForm: DataForm;

    this.forms.forEach((form) => {
      if (form.id === id) {
        foundForm = form;
      }
    });

    return foundForm;
  }

  addForm(form: DataForm) {
    this.forms.push(form);
    this.formsSubject.next(this.forms);
  }

}
