import { Injectable } from '@angular/core';

import { DataForm } from './data-form';
import { Observable ,  BehaviorSubject } from 'rxjs';

@Injectable()
export class DataFormsService {
  public forms$: Observable<DataForm[]>;
  public formsSubject: BehaviorSubject<DataForm[]>;

  private forms: DataForm[] = [
    { // Sample form until we have a backend.
      id: 'test-id',
      version: 1,
      name: 'test',
      fields: [{
        key: 'email',
        type: 'input',
        templateOptions: {
          type: 'email',
          label: 'Email address',
          placeholder: 'Enter email',
          required: true,
        }
      }],
    }
  ];

  constructor() {
    this.formsSubject = new BehaviorSubject<DataForm[]>(this.forms);
    this.forms$ = this.formsSubject.asObservable();
  }

  public getById(id: string): DataForm {
    let foundForm: DataForm;

    this.forms.forEach((form) => {
      if (form.id === id) {
        foundForm = form;
      }
    });

    return foundForm;
  }

  public save(form: DataForm) {
    const existingForm = this.getById(form.id);

    if (!existingForm) {
      return this.add(form);
    }

    existingForm.name = form.name;
    existingForm.fields = form.fields;
  }

  public add(form: DataForm) {
    this.forms.push(form);
    this.formsSubject.next(this.forms);
  }

}
