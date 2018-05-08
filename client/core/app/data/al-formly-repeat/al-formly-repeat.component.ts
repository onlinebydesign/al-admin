import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { FieldType } from '@ngx-formly/core';
import { cloneDeep } from 'lodash';

@Component({
  selector: 'al-formly-repeat',
  templateUrl: './al-formly-repeat.component.html',
  styleUrls: ['./al-formly-repeat.component.scss']
})
export class AlFormlyRepeatComponent extends FieldType implements OnInit {
  public _fields = [];
  public sectionsNumber: number = 0;
  public mycontrols: any;

  get newOptions() {
    return cloneDeep(this.options);
  }

  public ngOnInit() {
    this.mycontrols = (<any>this.formControl).controls;
    this.sectionsNumber++;
    (<FormArray>this.formControl).push(new FormGroup({}));
    let fieldGroup = cloneDeep(this.field.fieldArray.fieldGroup);
    let length = this._fields.push(fieldGroup);
    this.field.fieldArray.fieldGroup.forEach((campo, i) => {
      this._fields[length - 1][i].templateOptions = campo.templateOptions;
    });
  }

  public add() {
    if (this.formControl.disabled) {
      return;
    }
    this.sectionsNumber++;
    if (this.to.class) {
      this.model.push(new this.to.class());
    } else {
      this.model.push({});
    }
    let fieldGroup = cloneDeep(this.field.fieldArray.fieldGroup);
    let largo = this._fields.push(fieldGroup);
    this.field.fieldArray.fieldGroup.forEach((campo, i) => {
      this._fields[largo - 1][i].templateOptions = campo.templateOptions;
    });
    (<FormArray>this.formControl).push(new FormGroup({}));
  }

  public remove(i) {
    if (this.formControl.disabled) {
      return;
    }
    let result = true;
    if (this.to.removeWarning) {
      result = confirm(this.to.removeWarning);
    }
    if (result === true) {
      this.sectionsNumber--;
      (<FormArray>this.formControl).removeAt(i);
      this.model.splice(i, 1);
      this._fields.splice(i, 1);
    }
  }

  public fields(i) {
    if (this._fields[i]) {
      return this._fields[i];
    }

    this._fields.splice(i, 0, this.field.fieldArray.fieldGroup);

    return this._fields[i];
  }

  private clone(value) {
    if (!this.isObject(value)) {
      return value;
    }
    return Array.isArray(value) ? value.slice(0) : Object.assign({}, value);
  }

  private isObject(x) {
    return x != null && typeof x === 'object';
  }
}