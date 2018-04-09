import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import * as _ from 'lodash';

import { Data } from './data';
import { ReportData } from './al-reports/report-data';
import { Report } from './al-reports/report';

@Injectable()
export class DataService {
  public data$: Observable<Data[]>;
  public dataSubject: BehaviorSubject<Data[]>;

  private data: Data[] = [];

  constructor() {
    this.dataSubject = new BehaviorSubject<Data[]>(this.data);
    this.data$ = this.dataSubject.asObservable();
  }

  public getById(id: string): Data {
    let foundData: Data;

    this.data.forEach((datum) => {
      if (datum.id === id) {
        foundData = datum;
      }
    });

    return foundData;
  }

  public getByFormId(formId: string): Data[] {
    return _.filter(this.data, {formId: formId});
  }

  public save(data: Data) {
    const existingData = this.getById(data.id);

    if (!existingData) {
      return this.add(data);
    }

    existingData.data = data.data;
    existingData.formVersion = data.formVersion;
  }

  public generateReport(report: Report): ReportData[] {
    // Add the data for each form to the data[][] arrays
    const data = {};
    report.sources.forEach(source => data[source.id] = this.getByFormId(source.id));

    const reportData: ReportData[] = [];
    report.fields.forEach(field => {
      const results: ReportData = {
        label: field.name,
        value: null
      }

      const fieldValues: any[] = data[field.data.id].map(fieldData => fieldData.data[field.fieldId]);
      switch (field.type) {
        case 'count':
          results.value = this.reportCount(fieldValues) + '';
          break;
        case 'sum':
          results.value = this.reportSum(fieldValues) + '';
          break;
        case 'concat':
          results.value = this.reportConcat(fieldValues);
          break;
        default:
          results.value = '';
      }

      reportData.push(results);
    });

    return reportData;
  }

  private add(data: Data) {

    // Add the created value with the current date.
    data.created = new Date();

    this.data.push(data);
    this.dataSubject.next(this.data);
  }

  private reportCount(values: any[]): number {
    return values.reduce((prev: number, curr: any) => curr ? prev += 1 : prev, 0);
  }

  private reportSum(values: number[]): number {
    return values.reduce((prev: number, curr: number) => curr ? prev += curr : prev, 0);
  }

  private reportConcat(values: string[]): string {
    return values.reduce((prev: string, curr: string) => curr ? prev + curr : prev, '');
  }

}
