import { FormlyFieldConfig } from '@ngx-formly/core';

export interface DataForm {
  id: string;
  name: string;
  fields: FormlyFieldConfig[];
}
