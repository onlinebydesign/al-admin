import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { FlashMessagesService } from 'angular2-flash-messages';

import { DataForm } from '../data-form';
import { DataFormsService } from '../data-forms.service';
import { Data } from '../../data';
import { DataService } from '../../data.service';

@Component({
  selector: 'al-form-viewer',
  templateUrl: './form-viewer.component.html',
  styleUrls: ['./form-viewer.component.scss']
})
export class FormViewerComponent implements OnInit {
  public dataForm: DataForm;
  public form: FormGroup;
  public model: any;

  private formId: string;

  constructor(
    private dataFormsService: DataFormsService,
    private dataService: DataService,
    private flashMessageService: FlashMessagesService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    // Get the form from the form service if an form id is passed in.
    this.route.params
    .subscribe((params: Params) => {
      this.formId = params['id'];

      this.loadData();
    });

  }

  public submit(model) {
    const data: Data = {
      id: Math.random() + '',
      formId: this.dataForm.id,
      formVersion: this.dataForm.version,
      data: model,
      created: null
    }

    this.dataService.save(data);

    this.flashMessageService.show(
      'Form Saved',
      { cssClass: 'alert-info', timeout: 9500 }
    );

    setTimeout(() => this.loadData());
  }

  private loadData() {
    if (this.formId) {
      try {
        // We have to clone this so that ngx-formly doesn't mess with the the fields.
        this.dataForm = JSON.parse(JSON.stringify(this.dataFormsService.getById(this.formId)));
      } catch (e) {}
    }

    if (!this.dataForm) {
      this.dataForm = {
        id: Math.random() + '', // TODO: When this is created on the server we should remove this random number.
        version: 1,
        name: '',
        fields: []
      };
    }

    this.model = {};
    this.form = new FormGroup({})
  }

}
