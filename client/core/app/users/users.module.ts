import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ListComponent } from './list/list.component';
import { UserComponent } from './user/user.component';
import { UsersService } from './users.service';
import { SharedModule } from './../shared/shared.module';
import { UsersRoutingModule } from './users.routing.module';

@NgModule({
  imports: [
    CommonModule,
    UsersRoutingModule,
    FormsModule,
    SharedModule
  ],
  declarations: [
    ListComponent,
    UserComponent
  ],
  providers: [
    UsersService
  ]
})
export class UsersModule { }
