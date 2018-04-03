import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormsComponent } from './forms/forms.component';
import { FormCreatorComponent } from './form-creator/form-creator.component';
import { FormViewerComponent } from './form-viewer/form-viewer.component';
import { ReportsComponent } from './reports/reports.component';
import { ReportCreatorComponent } from './report-creator/report-creator.component';
import { ReportViewerComponent } from './report-viewer/report-viewer.component';
import { DataComponent } from './data/data.component';
import { DataGuard } from './data.guard';

const routes: Routes = [
  {
    path: '',
    component: DataComponent,
    data: {
      title: 'Data'
    },
    canActivate: [DataGuard]
  },
  {
    path: 'forms',
    component: FormsComponent,
    data: {
      title: 'Forms'
    },
    canActivate: [DataGuard]
  },
  {
    path: 'forms/creator',
    component: FormCreatorComponent,
    data: {
      title: 'Form Creator'
    },
    canActivate: [DataGuard]
  },
  {
    path: 'forms/editor/:id',
    component: FormCreatorComponent,
    data: {
      title: 'Form Editor'
    },
    canActivate: [DataGuard]
  },
  {
    path: 'forms/viewer/:id',
    component: FormViewerComponent,
    data: {
      title: 'Form Viewer'
    },
    canActivate: [DataGuard]
  },
  {
    path: 'reports',
    component: ReportsComponent,
    data: {
      title: 'Reports'
    },
    canActivate: [DataGuard]
  },
  {
    path: 'reports/creator',
    component: ReportCreatorComponent,
    data: {
      title: 'Report Creator'
    },
    canActivate: [DataGuard]
  },
  {
    path: 'reports/editor/:id',
    component: ReportCreatorComponent,
    data: {
      title: 'Report Editor'
    },
    canActivate: [DataGuard]
  },
  {
    path: 'reports/viewer/:id',
    component: ReportViewerComponent,
    data: {
      title: 'Report Viewer'
    },
    canActivate: [DataGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DataRoutingModule {}
