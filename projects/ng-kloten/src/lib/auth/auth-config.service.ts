import { InjectionToken } from '@angular/core';

export interface AuthModuleConfigInterface {
  shouldRedirectToSSOPage: boolean;
}

export const defaultConfig = { shouldRedirectToSSOPage: true };

export const AuthConfigService = new InjectionToken<AuthModuleConfigInterface>('AuthModuleConfig');
