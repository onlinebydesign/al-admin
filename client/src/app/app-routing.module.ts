import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { Error404Component } from './error404/error404.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'users', component: HomeComponent },
  { path: '**', component: Error404Component }
]

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {}
