import { Component, OnInit } from '@angular/core';

import { DataForm } from '../data-form';
import { DataFormsService } from '../data-forms.service';

@Component({
  selector: 'al-form-creator',
  templateUrl: './form-creator.component.html',
  styleUrls: ['./form-creator.component.scss']
})
export class FormCreatorComponent implements OnInit {
  public form: DataForm;

  constructor(private dataFormsService: DataFormsService) { }

  ngOnInit() {
    this.form = {
      id: Math.random() + '',
      name: '',
      model: '',
      fields: ''
    }
  }

  public save() {
    this.dataFormsService.addForm(this.form);
  }
}
