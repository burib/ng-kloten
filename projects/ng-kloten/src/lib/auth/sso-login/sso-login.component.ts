import { Component, OnInit, isDevMode } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from './../auth.service';

@Component({
  selector: 'ngkl-sso-login',
  templateUrl: 'sso-login.component.html',
  styleUrls: ['sso-login.component.scss']
})
export class SsoLoginComponent implements OnInit {

  constructor( private route: ActivatedRoute, private authService: AuthService) { }

  selectedProvider = 'LOCAL_SSO';
  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      window.location.href = '/';
    }
  }

  selectProvider = (provider = '') => {
    this.selectedProvider = provider;
  }

  redirectToProvidersPage = () => {
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
    // const ssoProviderDomain = isDevMode() ? 'http://localhost:3000' : '';
    const ssoProviderDomain = '';
    const providerUrl = this.selectedProvider === 'LOCAL_SSO' ? '/sso' : '/sso/3rdparty';

    window.location.href = `${ssoProviderDomain}${providerUrl}?relay_state=${returnUrl}`;
  }
}
