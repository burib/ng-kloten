import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { TodosModule } from './todos/todos.module'; // lazy loaded modules comes before AppRoutingModule
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { FooterModule, HeaderModule, AuthModule, BreadcrumbsModule, SidenavModule } from 'ng-kloten';

import {LayoutModule} from '@angular/cdk/layout';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    AuthModule.forRoot({shouldRedirectToSSOPage: false}),
    FooterModule,
    HeaderModule,
    BreadcrumbsModule,
    SidenavModule,
    LayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
