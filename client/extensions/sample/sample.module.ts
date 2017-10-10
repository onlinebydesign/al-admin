import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SampleRoutingModule } from './sample-routing.module';
import { SampleComponent } from './sample.component';

@NgModule({
  imports: [
    CommonModule,
    SampleRoutingModule
  ],
  declarations: [SampleComponent],
  exports: [SampleComponent]
})
export class SampleModule { }
