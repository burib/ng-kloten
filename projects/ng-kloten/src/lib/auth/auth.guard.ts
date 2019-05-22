import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService,
              private router: Router){
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {

    if(this.auth.isLoggedIn()){
      return true;
    } else {
      const returnUrl = `${window.location.origin}${next['_routerState']['url']}`;

      this.router.navigate(['/login-with-sso'], { queryParams: { returnUrl } });
      return false;
    }
  }
}
