import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { FlashMessagesService } from 'angular2-flash-messages';

import { DataForm } from '../data-form';
import { DataFormsService } from '../data-forms.service';

@Component({
  selector: 'al-form-creator',
  templateUrl: './form-creator.component.html',
  styleUrls: ['./form-creator.component.scss']
})
export class FormCreatorComponent implements OnInit {
  public name: string;
  public fields: string;

  private id: string;
  private version: number;
  private formId: string; // Should be the same as id but for what comes from the param.

  constructor(
    private dataFormsService: DataFormsService,
    private flashMessageService: FlashMessagesService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    // Get the form from the form service if an form id is passed in.
    this.route.params
    .subscribe((params: Params) => {
      this.formId = params['id'];

      this.loadData();
    });
  }

  public save() {
    let fields: FormlyFieldConfig[] = [];
    // TODO: Change form to automatically generate the JSON so we don't get JSON.parse errors.
    try {
      fields = JSON.parse(this.fields);
    } catch (e) {}

    const form: DataForm = {
      id: this.id,
      version: this.version += 1,
      name: this.name,
      fields: fields
    }

    this.dataFormsService.save(form);

    this.flashMessageService.show(
      'Form Saved',
      { cssClass: 'alert-info', timeout: 9500 }
    );

    this.loadData();
  }

  private loadData() {
    if (this.formId) {
      const form = Object.assign({}, this.dataFormsService.getById(this.formId));
      this.id = form.id;
      this.version = form.version;
      this.name = form.name;
      this.fields = JSON.stringify(form.fields);
      return;
    }

    // Defaults for new forms.
    this.id = Math.random() + ''; // TODO: When this is created on the server we should remove this random number.
    this.version = 0; // Start with 0 so incrementing sets the first saved to 1.
    this.name = '';
    this.fields = '';
  }
}
