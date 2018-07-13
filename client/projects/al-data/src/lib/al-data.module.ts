import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { DragulaModule } from 'ng2-dragula';

import { FormsComponent } from './al-forms/forms/forms.component';
import { FormCreatorComponent } from './al-forms/form-creator/form-creator.component';
import { FormViewerComponent } from './al-forms/form-viewer/form-viewer.component';
import { ReportsComponent } from './al-reports/reports/reports.component';
import { ReportCreatorComponent } from './al-reports/report-creator/report-creator.component';
import { ReportViewerComponent } from './al-reports/report-viewer/report-viewer.component';
import { DataComponent } from './data/data.component';
import { DataFormsService } from './al-forms/data-forms.service';
import { DataReportsService } from './al-reports/data-reports.service';
import { AlDataService } from './al-data.service';
import { FormComponent } from './al-forms/form/form.component';
import { AlFormlyRepeatComponent } from './al-formly-repeat/al-formly-repeat.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormlyModule.forRoot({
      types: [
        { name: 'al-repeated-section', component: AlFormlyRepeatComponent },
      ],
    }),
    FormlyBootstrapModule,
    FormsModule,
    TooltipModule.forRoot(),
    DragulaModule
  ],
  declarations: [
    FormsComponent,
    FormCreatorComponent,
    FormViewerComponent,
    ReportsComponent,
    ReportCreatorComponent,
    ReportViewerComponent,
    DataComponent,
    FormComponent,
    AlFormlyRepeatComponent,
  ],
  exports: [
    FormsComponent,
    FormCreatorComponent,
    FormViewerComponent,
    ReportsComponent,
    ReportCreatorComponent,
    ReportViewerComponent,
    DataComponent,
    FormComponent,
    AlFormlyRepeatComponent,
  ],
  providers: [
    DataFormsService,
    AlDataService,
    DataReportsService,
  ]
})
export class AlDataModule { }
