import { Component, OnInit } from '@angular/core';

import { DataForm } from '../data-form';

@Component({
  selector: 'al-form-creator',
  templateUrl: './form-creator.component.html',
  styleUrls: ['./form-creator.component.scss']
})
export class FormCreatorComponent implements OnInit {
  public form: DataForm;

  constructor() { }

  ngOnInit() {
    this.form = {
      name: '',
      model: '',
      fields: ''
    }
  }

}
