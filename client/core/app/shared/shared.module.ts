import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchListComponent } from './search-list/search-list.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SearchListComponent
  ],
  exports: [
    SearchListComponent
  ]
})
export class SharedModule { }
