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
    const token = this.router.parseUrl(fullUrl.split('#!')[1]).queryParams.token;

    if (token) {
      this.cookieService.set('token', token);
    }

    return token;
  };

  public getToken(): string {
    return this.cookieService.get('token') || this.getTokenFromQueryParam();
  }

  public isLoggedIn(): boolean {
    const token = this.getToken();
    const isLoggedIn = !this.jwtService.isTokenExpired(token);

    if (!isLoggedIn) {
      this.cookieService.remove('token');
    }

    return isLoggedIn;
  }

  public getUser(): any {
    let user = {};
    if (this.isLoggedIn()) {
      user = this.jwtService.decodeToken(this.getToken());
    }

    return user;
  }

  public logout(): any {
    this.cookieService.remove('token');

    window.location.href = `/login-with-sso?returnUrl=${window.location.href}`;
  }
}
