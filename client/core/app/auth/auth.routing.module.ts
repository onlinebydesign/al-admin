import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResetComponent } from './reset/reset.component';
import { RecoverComponent } from './recover/recover.component';
import { LogoutComponent } from './logout/logout.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login'
    }
  },
  {
    path: 'logout',
    component: LogoutComponent,
    data: {
      title: 'Logout'
    }
  },
  {
    path: 'recover',
    component: RecoverComponent,
    data: {
      title: 'Recover Password'
    }
  },
  {
    path: 'reset/:resetToken',
    component: ResetComponent,
    data: {
      title: 'Reset Password'
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register'
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
