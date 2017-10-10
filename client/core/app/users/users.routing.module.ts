import { ListComponent } from './list/list.component';
import { UserComponent } from './user/user.component';
import { ResetComponent } from './reset/reset.component';
import { RecoverComponent } from './recover/recover.component';
import { LogoutComponent } from './logout/logout.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    component: ListComponent,
    data: {
      title: 'User List'
    }
  },
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
    path: ':id',
    component: UserComponent,
    data: {
      title: 'User'
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule {}
