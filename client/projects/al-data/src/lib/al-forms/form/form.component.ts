import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { FlashMessagesService } from 'angular2-flash-messages';

import { DataForm } from '../data-form';
import { DataFormsService } from '../data-forms.service';
import { Data } from '../../data';
import { AlDataService } from '../../al-data.service';

@Component({
  selector: 'al-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  @Input() public formId: string;
  @Input() public dataId: string;
  @Output() public saved = new EventEmitter<Data>();

  public dataForm: DataForm;
  public form: FormGroup;
  public model: any;

  private data: Data;

  constructor(
    private dataFormsService: DataFormsService,
    private dataService: AlDataService,
    private flashMessageService: FlashMessagesService
  ) { }

  ngOnInit() {
    // Get the form from the form service if an form id is passed in.
    this.loadData();
  }

  public submit(model) {
    let data: Data;

    if (this.data) {
      this.data.data = model;
    } else {
      data = {
        id: Math.random() + '',
        formId: this.dataForm.id,
        formVersion: this.dataForm.version,
        data: model,
        created: null
      }
    }

    this.dataService.save(this.data || data);
    this.saved.emit(this.data || data);

    this.flashMessageService.show(
      'Form Saved',
      { cssClass: 'alert-info', timeout: 9500 }
    );

    setTimeout(() => {
      this.loadData();
    });
  }

  private loadData() {
    if (this.formId) {
      try {
        // We have to clone this so that ngx-formly doesn't mess with the the fields.
        this.dataForm = JSON.parse(JSON.stringify(this.dataFormsService.getById(this.formId)));
      } catch (e) { }
    }

    if (!this.dataForm) {
      this.dataForm = {
        id: Math.random() + '', // TODO: When this is created on the server we should remove this random number.
        version: 1,
        name: '',
        fields: []
      };
    }

    this.form = new FormGroup({});

    if (this.dataId) {
      this.data = this.dataService.getById(this.dataId);
      return this.model = this.data.data;
    }

    this.model = {};
  }

}
