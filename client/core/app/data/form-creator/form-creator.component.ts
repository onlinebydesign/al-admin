import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormlyFieldConfig } from '@ngx-formly/core';

import { DataForm } from '../data-form';
import { DataFormsService } from '../data-forms.service';

@Component({
  selector: 'al-form-creator',
  templateUrl: './form-creator.component.html',
  styleUrls: ['./form-creator.component.scss']
})
export class FormCreatorComponent implements OnInit {
  public id: string = '';
  public name: string = '';
  public fields: string = '';

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
        const form = Object.assign({}, this.dataFormsService.getById(formId));
        this.id = form.id;
        this.name = form.name;
        this.fields = JSON.stringify(form.fields);
        return;
      }

      this.id = Math.random() + ''; // TODO: When this is created on the server we should remove this random number.
      this.name = '';
      this.fields = '';
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
      name: this.name,
      fields: fields
    }

    this.dataFormsService.save(form);
  }
}
