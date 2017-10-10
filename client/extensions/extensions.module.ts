import { NgModule } from '@angular/core';

import { ExtensionsRoutingModule } from './extensions-routing.module';
// Import all new extensions as modules here.
import { SampleModule } from './sample/sample.module';

@NgModule({
  imports: [
    // Add extension module here.
    SampleModule,

    // Keep as last module
    ExtensionsRoutingModule
    
  ],
})
export class ExtensionsModule {}
