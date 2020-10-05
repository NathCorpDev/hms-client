import { Injectable } from '@angular/core';
import { CanActivate, Router, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './services/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(
    private _authService: AuthService,
    private router: Router
  ) { }

  // canActivate(): boolean {
  //   if (this._authService.isLoggedIn()) {
  //     return true;
  //   } else {
  //     this.router.navigateByUrl('/login');
  //     return false;
  //   }
  // }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const allowedRoles = next.data.Roles;
    const isAuthorized = this._authService.isAuthorized(allowedRoles);

    if (!isAuthorized) {
      this.router.navigateByUrl('/accessdenied');
    }
    return isAuthorized;
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const allowedRoles = next.data.Roles;
    const isAuthorized = this._authService.isAuthorized(allowedRoles);

    if (!isAuthorized) {
      this.router.navigateByUrl('/accessdenied');
    }
    return isAuthorized;
  }
}
