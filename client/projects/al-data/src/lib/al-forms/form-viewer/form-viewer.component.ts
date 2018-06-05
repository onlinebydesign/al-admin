import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { FlashMessagesService } from 'angular2-flash-messages';

import { DataForm } from '../data-form';
import { DataFormsService } from '../data-forms.service';
import { Data } from '../../data';
import { AlDataService } from '../../al-data.service';

@Component({
  selector: 'al-form-viewer',
  templateUrl: './form-viewer.component.html',
  styleUrls: ['./form-viewer.component.scss']
})
export class FormViewerComponent implements OnInit {
  public dataForm: DataForm;
  public form: FormGroup;
  public model: any;
  public data: Data[];
  public selectedDatum: Data;

  public formId: string;

  constructor(
    private dataFormsService: DataFormsService,
    private dataService: AlDataService,
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

    // TODO: There should be an observable for the formId of data instead of for the entire collection.
    this.dataService.data$.subscribe(() => this.data = this.dataService.getByFormId(this.formId));
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
    this.form = new FormGroup({});
  }

}
