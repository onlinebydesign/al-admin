import { FormlyFieldConfig } from '@ngx-formly/core';

export interface DataForm {
  id: string;
  version: number;
  name: string;
  fields: FormlyFieldConfig[];
}
