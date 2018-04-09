import { DataSource } from '../data-source';

export interface DataReportField {
  id: string;
  name: string;
  data: DataSource;
  fieldId: string;
  type: string;
}
