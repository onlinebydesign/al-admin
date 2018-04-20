import { Component, OnInit } from '@angular/core';

import { DataFormsService } from '../data-forms.service';
import { DataForm } from '../data-form';

@Component({
  selector: 'al-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss']
})
export class FormsComponent implements OnInit {
  public forms: DataForm[];

  constructor(private formsService: DataFormsService) {
    this.formsService.forms$.subscribe((forms) => this.forms = forms);
  }

  ngOnInit() {
  }

}
