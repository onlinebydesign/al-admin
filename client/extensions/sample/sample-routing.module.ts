import { NgModule } from '@angular/core';
import { Routes,
     RouterModule } from '@angular/router';

import { SampleComponent } from './sample.component';

const routes: Routes = [
  {
    path: 'sample2',
    component: SampleComponent,
    data: {
      title: 'Sample'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SampleRoutingModule {}
