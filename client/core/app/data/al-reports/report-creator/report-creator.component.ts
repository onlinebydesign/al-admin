import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';

import { DataForm } from '../../al-forms/data-form';
import { DataFormsService } from '../../al-forms/data-forms.service';
import { DataReport } from '../data-report';
import { DataReportsService } from '../data-reports.service';
import { DataReportField } from '../data-report-field';

@Component({
  selector: 'al-report-creator',
  templateUrl: './report-creator.component.html',
  styleUrls: ['./report-creator.component.scss']
})
export class ReportCreatorComponent implements OnInit {
  public forms: DataForm[];
  public name: string;
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

  private report: DataReport;

  constructor(
    private formsService: DataFormsService,
    private reportsService: DataReportsService
  ) {
    this.formsService.forms$.subscribe((forms) => this.forms = forms);
  }

  ngOnInit() {
  }

  public save() {
    console.log(this.name, this.reportForms, this.fields);
  }

  public addField() {
    const newField: DataReportField = {
      id: Math.random() + '',
      name: '',
      formId: '',
      fieldId: '',
      type: '',
    }

    this.fields.push(newField);
  }

  public updateFullReportForms() {
    // Using the ids from the reportForms array generate an array of forms that have the correct ids.
    this.fullReportForms = _.filter(this.forms, (form) => this.reportForms.includes(form.id));

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
}
