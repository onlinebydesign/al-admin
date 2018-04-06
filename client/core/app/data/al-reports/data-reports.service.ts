import { Injectable } from '@angular/core';

import { DataReport } from './data-report';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class DataReportsService {
  public reports$: Observable<DataReport[]>;
  public reportsSubject: BehaviorSubject<DataReport[]>;

  private reports: DataReport[] = [
    { // Sample form until we have a backend.
      id: 'test-id',
      version: 1,
      form: ['test-id'],
      name: 'test',
      fields: [{
        id: 'field-id',
        name: 'Emails',
        formId: 'test-id',
        formVersion: 1,
        fieldId: 'email',
        type: 'count',
      }],
    }
  ];

  constructor() {
    this.reportsSubject = new BehaviorSubject<DataReport[]>(this.reports);
    this.reports$ = this.reportsSubject.asObservable();
  }

  public getById(id: string): DataReport {
    let foundReport: DataReport;

    this.reports.forEach((report) => {
      if (report.id === id) {
        foundReport = report;
      }
    });

    return foundReport;
  }

  public save(report: DataReport) {
    const existingReport = this.getById(report.id);

    if (!existingReport) {
      return this.add(report);
    }

    existingReport.name = report.name;
    existingReport.fields = report.fields;
  }

  public add(report: DataReport) {
    this.reports.push(report);
    this.reportsSubject.next(this.reports);
  }

}
