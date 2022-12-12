import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild } from '@angular/router';
import { Adal5Service} from 'adal-angular5';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private adalSvc: Adal5Service) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.adalSvc.userInfo.authenticated) {
      console.log('AuthGuard', 'ok');
      return true;
    } else {
      console.log('AuthGuard', 'not so ok');
      this.router.navigate(['/error-unauthorized'], { queryParams: { returnUrl: state.url } });
      // this.router.navigate(['/error-login-time-out']);
      return false;
    }
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.canActivate(route, state);
  }

}
