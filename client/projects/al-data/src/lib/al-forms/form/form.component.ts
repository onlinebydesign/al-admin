import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
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

  public async submit(model) {
    let data: Data;

    if (this.data) {
      this.data.data = model;
    } else {
      data = {
        formId: this.dataForm.id,
        formVersion: this.dataForm.version,
        data: model,
        position: null
      }
    }

    await this.dataService.save(this.data || data);
    this.saved.emit(this.data || data);

    if (this.flashMessageService.show) {
      this.flashMessageService.show(
        'Form Saved',
        { cssClass: 'alert-info', timeout: 9500 }
      );
    }

    setTimeout(() => {
      this.loadData();
    });

    return this.data || data;
  }

  private async loadData() {
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
      this.data = await this.dataService.getById(this.dataId);
      this.model = this.data.data;
    } else {
      this.model = {};
    }

    return this.model;
  }

}
