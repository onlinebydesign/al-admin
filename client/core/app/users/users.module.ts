import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { LoginComponent } from './login/login.component';
import { RecoverComponent } from './recover/recover.component';
import { RegisterComponent } from './register/register.component';
import { ResetComponent } from './reset/reset.component';
import { LogoutComponent } from './logout/logout.component';
import { ListComponent } from './list/list.component';
import { UserComponent } from './user/user.component';
import { UsersService } from './users.service';
import { SharedModule } from './../shared/shared.module';
import { UsersRoutingModule } from './users.routing.module';
import { AuthService } from './auth.service';

@NgModule({
  imports: [
    CommonModule,
    UsersRoutingModule,
    FormsModule,
    SharedModule
  ],
  declarations: [
    LoginComponent,
    RecoverComponent,
    RegisterComponent,
    ResetComponent,
    LogoutComponent,
    ListComponent,
    UserComponent
  ],
  providers: [
    UsersService,
    AuthService
  ]
})
export class UsersModule { }
