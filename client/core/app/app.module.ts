import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {LocationStrategy, PathLocationStrategy} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';

// Import containers
import {
  FullLayoutComponent,
  SimpleLayoutComponent
} from './containers';

const APP_CONTAINERS = [
  FullLayoutComponent,
  SimpleLayoutComponent
];

// Import components
import {
  BreadcrumbsComponent,
  FooterComponent,
  HeaderComponent,
  SidebarComponent
} from './components';

const APP_COMPONENTS = [
  BreadcrumbsComponent,
  FooterComponent,
  HeaderComponent,
  SidebarComponent
];

// Import directives
import {
  AsideToggleDirective,
  NAV_DROPDOWN_DIRECTIVES,
  SIDEBAR_TOGGLE_DIRECTIVES
} from './directives';

const APP_DIRECTIVES = [
  AsideToggleDirective,
  NAV_DROPDOWN_DIRECTIVES,
  SIDEBAR_TOGGLE_DIRECTIVES
];

// Import routing module
import { AppRoutingModule } from './app.routing';

// Import 3rd party components
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { FlashMessagesModule } from 'angular2-flash-messages';

import { SharedModule } from './shared/shared.module';
import { AlCoreModule } from 'al-core';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ChartsModule,
    HttpClientModule,
    FlashMessagesModule.forRoot(),
    SharedModule,
    AlCoreModule
  ],
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    ...APP_COMPONENTS,
    ...APP_DIRECTIVES
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
