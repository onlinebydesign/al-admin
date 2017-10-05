import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RecoverComponent } from './recover/recover.component';
import { RegisterComponent } from './register/register.component';
import { ResetComponent } from './reset/reset.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [LoginComponent, RecoverComponent, RegisterComponent, ResetComponent]
})
export class UsersModule { }
