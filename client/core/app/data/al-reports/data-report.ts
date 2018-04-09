import { DataSource } from '../data-source';
import { DataReportField } from './data-report-field';

export interface DataReport {
  id: string;
  version: number;
  name: string;
  sources: DataSource[];
  fields: DataReportField[];
}
