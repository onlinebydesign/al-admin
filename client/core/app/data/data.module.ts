import { NgModule } from '@angular/core';

import { AlDataModule } from 'al-data';

import { DataGuard } from './data.guard';
import { DataRoutingModule } from './data.routing';

@NgModule({
  imports: [
    AlDataModule,
    DataRoutingModule,
  ],
  declarations: [],
  providers: [
    DataGuard,
  ]
})
export class DataModule { }
