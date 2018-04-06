import { DataReportField } from './data-report-field';

export interface DataReport {
  id: string;
  version: number;
  name: string;
  forms: string[];
  fields: DataReportField[];
}
