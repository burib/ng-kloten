import { Injectable } from '@angular/core';
import { JwtService } from './jwt.service';
import { CookieService } from './cookie.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private jwtService: JwtService,
              private cookieService: CookieService,
              private router: Router) {}

  private getTokenFromQueryParam = function() {
    const fullUrl = window.location.href;
    let token = this.router.parseUrl(fullUrl.split('#!')[1]).queryParams.token;

    if (!token) {
      console.info('[auth]: No token found in params.');
    } else {
      this.cookieService.set('token', token);
    }

    return token;
  };

  public getToken(): string {
    const token = this.cookieService.get('token') || this.getTokenFromQueryParam();

    return token;
  };

  public isLoggedIn(): boolean {
    const token = this.getToken();
    const isLoggedIn = !this.jwtService.isTokenExpired(token);

    if (!isLoggedIn) {
      this.cookieService.remove('token');
    }

    return isLoggedIn;
  }

  public getUser(): any {
    if (this.isLoggedIn()) {
      return this.jwtService.decodeToken(this.getToken());
    } else {
      return {}
    }
  }

  public logout(): any {
    this.cookieService.remove('token');

    window.location.href = `/login-with-sso?returnUrl=${window.location.href}`;
  }
}
