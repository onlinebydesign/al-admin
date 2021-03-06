import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BsDropdownModule, PopoverModule } from 'ngx-bootstrap';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';

import { AlTableComponent } from './al-table/al-table.component';
import { AlThComponent } from './al-table/al-th.component';
import { AlFocusDirective } from './al-focus/al-focus.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BsDropdownModule.forRoot(),
    PopoverModule.forRoot(),
    MultiselectDropdownModule,
  ],
  declarations: [
    AlTableComponent,
    AlThComponent,
    AlFocusDirective,
  ],
  exports: [
    AlTableComponent,
    AlThComponent,
    AlFocusDirective,
  ]
})
export class SharedModule { }
