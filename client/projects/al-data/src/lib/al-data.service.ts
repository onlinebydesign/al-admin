import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import * as _ from 'lodash';

import { Data } from './data';
import { ReportData } from './al-reports/report-data';
import { Report } from './al-reports/report';
import { DataReportField } from './al-reports/data-report-field';

@Injectable({
  providedIn: 'root'
})
export class AlDataService {
  public data$: Observable<Data[]>;
  public dataSubject: BehaviorSubject<Data[]>;

  private data: Data[] = [];

  constructor(private http: HttpClient) {
    this.dataSubject = new BehaviorSubject<Data[]>(this.data);
    this.data$ = this.dataSubject.asObservable();
  }

  public async getById(id: string): Promise<Data> {
    let foundData: Data;

    this.data.forEach((datum) => {
      if (datum.id === id) {
        foundData = datum;
      }
    });

    if (foundData) {
      return foundData;
    }

    return this.http.get(`api/data/${id}`).toPromise().then((res: HttpResponse<any>): Data => res.body);
  }

  /**
   * If there are any data values for the form then return those else check
   * for them on the server.
   */
  public async getByFormId(formId: string): Promise<Data[]> {
    const formData = _.filter(this.data, {formId: formId});

    if (formData) {
      return formData;
    }

    return this.http.get(`api/data?formId=${formId}`).toPromise().then((res: HttpResponse<any>): Data[] => res.body);
  }

  public async save(data: Data): Promise<Data> {
    let existingData;
    if (data.id) {
      existingData = await this.getById(data.id);

      existingData.data = data.data;
      existingData.formVersion = data.formVersion;
    }

    const resData = await this.send(existingData || data);

    if (!existingData) {
      this.add(resData);
    }

    return resData;
  }

  public generateReport(report: Report): ReportData[] {
    // Add the data for each form to the data[][] arrays
    const data = {};
    report.sources.forEach(source => data[source.id] = this.getByFormId(source.id));

    const reportData: ReportData[] = [];
    report.fields.forEach(field => {
      reportData.push(this.processField(field, data));
    });

    return reportData;
  }

  private send(data: Data): Promise<Data> {
    return this.http.post('api/data', data).toPromise().then((res: HttpResponse<any>): Data => res.body);
  }

  private processField(field: DataReportField, data: any) {
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

    return results;
  }

  private add(data: Data): Data {
    this.data.push(data);
    this.dataSubject.next(this.data);
    return data;
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
