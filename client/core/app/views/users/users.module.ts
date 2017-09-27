import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UsersComponent} from './users.component';
import {UsersRoutingModule} from './users.routing.module';

@NgModule({
  imports: [UsersRoutingModule, CommonModule],
  declarations: [UsersComponent]
})
export class UsersModule {
}
