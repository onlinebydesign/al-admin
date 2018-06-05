import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
  FormsComponent,
  FormCreatorComponent,
  FormViewerComponent,
  ReportsComponent,
  ReportCreatorComponent,
  ReportViewerComponent,
  DataComponent
} from 'al-data';

import { DataGuard } from './data.guard';

const routes: Routes = [
  {
    path: '',
    component: DataComponent,
    data: {
      title: 'Data'
    },
    canActivate: [DataGuard],
    children: [
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
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DataRoutingModule {}
