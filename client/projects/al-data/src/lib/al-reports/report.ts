import { DataSource } from '../data-source';
import { DataReportField } from './data-report-field';

export interface Report {
  id: string;
  version: number;
  name: string;
  sources: DataSource[];
  fields: DataReportField[];
}
