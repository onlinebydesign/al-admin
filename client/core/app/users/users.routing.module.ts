import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListComponent } from './list/list.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {
    path: '',
    component: ListComponent,
    data: {
      title: 'User List'
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
