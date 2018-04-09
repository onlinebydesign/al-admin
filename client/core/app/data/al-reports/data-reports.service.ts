import { Injectable } from '@angular/core';

import { Report } from './report';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class DataReportsService {
  public reports$: Observable<Report[]>;
  public reportsSubject: BehaviorSubject<Report[]>;

  private reports: Report[] = [
    { // Sample form until we have a backend.
      id: 'test-id',
      version: 1,
      sources: [{source: 'form', id: 'test-id'}],
      name: 'test',
      fields: [{
        id: 'field-id',
        name: 'Emails',
        data: {source: 'form', id: 'test-id', version: 1},
        fieldId: 'email',
        type: 'count',
      }],
    }
  ];

  constructor() {
    this.reportsSubject = new BehaviorSubject<Report[]>(this.reports);
    this.reports$ = this.reportsSubject.asObservable();
  }

  public getById(id: string): Report {
    let foundReport: Report;

    this.reports.forEach((report) => {
      if (report.id === id) {
        foundReport = report;
      }
    });

    return foundReport;
  }

  public save(report: Report) {
    const existingReport = this.getById(report.id);

    if (!existingReport) {
      return this.add(report);
    }

    existingReport.name = report.name;
    existingReport.fields = report.fields;
  }

  public add(report: Report) {
    this.reports.push(report);
    this.reportsSubject.next(this.reports);
  }

}
