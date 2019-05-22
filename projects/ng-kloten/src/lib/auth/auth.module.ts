import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';

import { SsoLoginComponent } from './sso-login/sso-login.component';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthHTTPInterceptor } from './auth.http.interceptor';

@NgModule({
  declarations: [SsoLoginComponent],
  exports: [SsoLoginComponent],
  imports: [
    CommonModule,
    AuthRoutingModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHTTPInterceptor,
      multi: true
    }
  ]
})
export class AuthModule { }
