import { DataRoutingModule } from './data.routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';

import { FormsComponent } from './forms/forms.component';
import { FormCreatorComponent } from './form-creator/form-creator.component';
import { FormViewerComponent } from './form-viewer/form-viewer.component';
import { ReportsComponent } from './reports/reports.component';
import { ReportCreatorComponent } from './report-creator/report-creator.component';
import { ReportViewerComponent } from './report-viewer/report-viewer.component';
import { DataComponent } from './data/data.component';
import { DataGuard } from './data.guard';
import { DataFormsService } from './data-forms.service';

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
  ],
  providers: [
    DataGuard,
    DataFormsService,
  ]
})
export class DataModule { }
