import { CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private route: Router) { }

  canActivate(route, state: RouterStateSnapshot) {
    if (this.authService.isAuthenticated()) { return true; }
    this.route.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
