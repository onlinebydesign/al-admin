import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';

import { FormsComponent } from './al-forms/forms/forms.component';
import { FormCreatorComponent } from './al-forms/form-creator/form-creator.component';
import { FormViewerComponent } from './al-forms/form-viewer/form-viewer.component';
import { ReportsComponent } from './al-reports/reports/reports.component';
import { ReportCreatorComponent } from './al-reports/report-creator/report-creator.component';
import { ReportViewerComponent } from './al-reports/report-viewer/report-viewer.component';
import { DataComponent } from './data/data.component';
import { DataGuard } from './data.guard';
import { DataFormsService } from './al-forms/data-forms.service';
import { DataReportsService } from './al-reports/data-reports.service';
import { DataService } from './data.service';
import { FormComponent } from './al-forms/form/form.component';
import { DataRoutingModule } from './data.routing.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormlyModule.forRoot(),
    FormlyBootstrapModule,
    DataRoutingModule,
    FormsModule,
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
  ],
  providers: [
    DataGuard,
    DataFormsService,
    DataService,
    DataReportsService,
  ]
})
export class DataModule { }
