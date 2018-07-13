import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { FlashMessagesService } from 'angular2-flash-messages';

import { DataForm } from '../data-form';
import { DataFormsService } from '../data-forms.service';
import { Data } from '../../data';
import { AlDataService } from '../../al-data.service';
import { DragulaService } from 'ng2-dragula';

@Component({
  selector: 'al-form-viewer',
  templateUrl: './form-viewer.component.html',
  styleUrls: ['./form-viewer.component.scss']
})
export class FormViewerComponent implements OnInit {
  public dataForm: DataForm;
  public form: FormGroup;
  public model: any;

  private dataProxy = {
    // Watch for changes to the array. Updates the position value to match the array position.
    set: (target: Data[], property: string, value: Data) => {
      if (property !== 'length') {
        value.position = Number(property);
      }
      target[property] = value;
      return true;
    }
  };
  public data: Data[] = new Proxy([], this.dataProxy);

  public selectedDatum: Data;

  public formId: string;

  constructor(
    private dataFormsService: DataFormsService,
    private dataService: AlDataService,
    private flashMessageService: FlashMessagesService,
    private route: ActivatedRoute,
    private dragulaService: DragulaService
  ) {
    dragulaService.drop.subscribe(value => this.onDragDrop());
  }

  ngOnInit() {
    // Get the form from the form service if an form id is passed in.
    this.route.params
    .subscribe((params: Params) => {
      this.formId = params['id'];

      this.loadForm();
    });

    // TODO: There should be an observable for the formId of data instead of for the entire collection.
    this.dataService.data$.subscribe(() => this.loadData());
  }

  private async loadForm() {
    if (this.formId) {
      try {
        // We have to clone this so that ngx-formly doesn't mess with the the fields.
        this.dataForm = JSON.parse(JSON.stringify(await this.dataFormsService.getById(this.formId)));
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
    this.loadData();
  }

  private async loadData() {
    const data = await this.dataService.getByFormId(this.formId);
    this.data.length = 0;
    this.data.push(...data);
  }

  private onDragDrop() {
    this.dataService.update(this.data)
  }
}
