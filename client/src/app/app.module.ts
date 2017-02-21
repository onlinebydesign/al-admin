import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// Third party modules
import { AccordionModule } from 'ng2-bootstrap/accordion';
import { DropdownModule } from 'ng2-bootstrap/dropdown';

// Application specific modeles/components
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { Error404Component } from './error404/error404.component';
import { UsersComponent } from './users/users.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    Error404Component,
    UsersComponent
  ],
  imports: [
    // Angular Core
    BrowserModule,
    FormsModule,
    HttpModule,
    // Third Party
    AccordionModule.forRoot(),
    DropdownModule.forRoot(),
    // Application specific
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
