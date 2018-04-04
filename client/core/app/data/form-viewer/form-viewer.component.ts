import { Component, OnInit } from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FormlyFieldConfig} from '@ngx-formly/core';
import { ActivatedRoute, Params } from '@angular/router';

import { DataForm } from '../data-form';
import { DataFormsService } from '../data-forms.service';
@Component({
  selector: 'al-form-viewer',
  templateUrl: './form-viewer.component.html',
  styleUrls: ['./form-viewer.component.scss']
})
export class FormViewerComponent implements OnInit {
  public dataForm: DataForm;
  public form = new FormGroup({});
  public model: any;

  constructor(
    private dataFormsService: DataFormsService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    // Get the form from the form service if an form id is passed in.
    this.route.params
    .subscribe((params: Params) => {
      const formId: string = params['id'];

      if (formId) {
        try {
          // We have to clone this so that ngx-formly doesn't mess with the the fields.
          this.dataForm = JSON.parse(JSON.stringify(this.dataFormsService.getById(formId)));
        } catch (e) {}
      }

      if (!this.dataForm) {
        this.dataForm = {
          id: Math.random() + '', // TODO: When this is created on the server we should remove this random number.
          name: '',
          fields: []
        };
      }
    });

    this.model = {};
  }

  public submit(model) {
    console.log(model);
  }

}
