import { Component } from '@angular/core';
import { FieldArrayType, FormlyFormBuilder } from '@ngx-formly/core';

@Component({
  selector: 'al-formly-repeat',
  templateUrl: './al-formly-repeat.component.html',
  styleUrls: ['./al-formly-repeat.component.scss']
})
export class AlFormlyRepeatComponent extends FieldArrayType {
  constructor(builder: FormlyFormBuilder) {
    super(builder);
  }
}
