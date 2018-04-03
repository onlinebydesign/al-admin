import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { LoginComponent } from './login/login.component';
import { RecoverComponent } from './recover/recover.component';
import { RegisterComponent } from './register/register.component';
import { LogoutComponent } from './logout/logout.component';
import { SharedModule } from '../shared/shared.module';
import { AuthRoutingModule } from './auth.routing.module';
import { AuthService } from './auth.service';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    SharedModule
  ],
  declarations: [
    LoginComponent,
    RecoverComponent,
    RegisterComponent,
    LogoutComponent,
    ResetPasswordComponent,
  ],
  providers: [
    AuthService
  ]
})
export class AuthModule { }
