import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import * as _ from 'lodash';

import { DataForm } from '../../al-forms/data-form';
import { DataFormsService } from '../../al-forms/data-forms.service';
import { Report } from '../report';
import { DataReportsService } from '../data-reports.service';
import { DataReportField } from '../data-report-field';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'al-report-creator',
  templateUrl: './report-creator.component.html',
  styleUrls: ['./report-creator.component.scss']
})
export class ReportCreatorComponent implements OnInit {
  public forms: DataForm[];
  public reportId: string;
  public id: string;
  public version: number;
  public name: string;
  // TODO: Allow additional sources beyond forms.
  public reportForms: string[];
  public fullReportForms: DataForm[];
  public formsFields: any;
  public fields: DataReportField[] = [];
  public fieldTypes = [
    {
      id: 'count',
      label: 'Count',
    },
    {
      id: 'sum',
      label: 'Sum',
    },
    {
      id: 'concat',
      label: 'Combine Text',
    }
  ];

  private report: Report;

  constructor(
    private formsService: DataFormsService,
    private reportsService: DataReportsService,
    private flashMessageService: FlashMessagesService,
    private route: ActivatedRoute
  ) {
    this.formsService.forms$.subscribe((forms) => this.forms = forms);
  }

  ngOnInit() {
    // Get the form from the form service if an form id is passed in.
    this.route.params
      .subscribe((params: Params) => {
        this.reportId = params['id'];

        this.loadData();
      });
  }

  public save() {
    const report: Report = {
      id: this.id,
      version: this.version += 1,
      name: this.name,
      // TODO: Allow additional sources beyond forms.
      sources: this.reportForms.map((formId) => {
        return {
          source: 'form',
          id: formId
        };
      }),
      fields: this.fields
    }

    this.reportsService.save(report);

    this.flashMessageService.show(
      'Form Saved',
      { cssClass: 'alert-info', timeout: 9500 }
    );

    this.loadData();
  }

  public addField() {
    const newField: DataReportField = {
      id: Math.random() + '',
      name: '',
      data: {source: 'form', id: null},
      fieldId: '',
      type: '',
    }

    this.fields.push(newField);
  }

  public updateFullReportForms() {
    // Using the ids from the reportForms array generate an array of forms that have the correct ids.
    this.fullReportForms = _.filter(this.forms, (form) => _.includes(this.reportForms, form.id));

    // This seems hacky but basically we need to generate an array of the fields that a form has that we key of form.id.
    this.formsFields = {};
    this.fullReportForms.forEach((form) => {
      const formFields = form.fields.map((field) => {
        return {
          id: field.key,
          label: field.templateOptions.label
        };
      });

      this.formsFields[form.id] = formFields;
    });
  }

  private loadData() {
    if (this.reportId) {
      const report = Object.assign({}, this.reportsService.getById(this.reportId));
      this.id = report.id;
      this.version = report.version;
      this.name = report.name;
      // TODO: Allow additional sources beyond forms.
      this.reportForms = report.sources.map(source => source.id);
      this.fields = report.fields;

      this.updateFullReportForms();
      return;
    }

    // Defaults for new forms.
    this.id = Math.random() + ''; // TODO: When this is created on the server we should remove this random number.
    this.version = 0; // Start with 0 so incrementing sets the first saved to 1.
    this.name = '';
    this.reportForms = [];
    this.fields = [];
  }

}
