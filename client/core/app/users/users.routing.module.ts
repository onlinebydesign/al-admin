import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListComponent } from './list/list.component';
import { UserComponent } from './user/user.component';
import { UsersGuard } from './users.guard';

const routes: Routes = [
  {
    path: '',
    component: ListComponent,
    data: {
      title: 'User List'
    },
    canActivate: [UsersGuard]
  },
  {
    path: ':id',
    component: UserComponent,
    data: {
      title: 'User'
    },
    canActivate: [UsersGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule {}
