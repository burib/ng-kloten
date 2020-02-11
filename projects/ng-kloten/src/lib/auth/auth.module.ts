import {InjectionToken, ModuleWithProviders, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';

import { SsoLoginComponent } from './sso-login/sso-login.component';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthHTTPInterceptor } from './auth.http.interceptor';
import {AuthService} from './auth.service';
import { AuthConfigService, AuthModuleConfigInterface, defaultConfig } from './auth-config.service';

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

export class AuthModule {
  static forRoot(config: AuthModuleConfigInterface = defaultConfig): ModuleWithProviders<AuthModule> {
    return {
      ngModule: AuthModule,
      providers: [
        AuthService,
        {
          provide: AuthConfigService,
          useValue: config
        }
      ]
    };
  }
}
