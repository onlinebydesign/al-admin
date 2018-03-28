import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';

import { ListComponent } from './list/list.component';
import { UserComponent } from './user/user.component';
import { UsersService } from './users.service';
import { SharedModule } from './../shared/shared.module';
import { UsersRoutingModule } from './users.routing.module';
import { UsersGuard } from './users.guard';

@NgModule({
  imports: [
    CommonModule,
    UsersRoutingModule,
    FormsModule,
    ModalModule.forRoot(),
    SharedModule
  ],
  declarations: [
    ListComponent,
    UserComponent
  ],
  providers: [
    UsersService,
    UsersGuard
  ]
})
export class UsersModule { }
