import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UsersComponent } from './users.component';

const usersRoutes: Routes = [
  { path: 'users',  component: UsersComponent },
  { path: 'users/add', component: UsersComponent },
  { path: 'user/:id', component: UsersComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(usersRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class UsersRoutingModule { }
