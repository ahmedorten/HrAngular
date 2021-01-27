import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { DataService } from './data.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthService extends DataService {
  token: string;
  constructor(http: HttpClient, private route: Router) {
    super(environment.apiUrl + '/auth', http);
  }


  logout() {
    localStorage.removeItem('token');
    this.route.navigate(['/login']);
  }

  getToken() {
    return this.token;
  }

  isAuthenticated() {
    // here you can check if user is authenticated or not through his token
    this.token = localStorage.getItem('token');
    if (!this.token) { return false; }
    const helper = new JwtHelperService();
    const isExpired = helper.isTokenExpired(this.token);
    return !isExpired;
  }

  isUserInRole(roleName) {
    const token = localStorage.getItem('token');
    if (!token) { return false; }
    const jwtHelper = new JwtHelperService();
    const decodedToken = jwtHelper.decodeToken(token)
    const roles = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
    if (typeof roles === 'undefined') {
      return false;
    }
    if (typeof (roles) === 'string') {
      if (roles === roleName) { return true; }
    } else {
      if ((roles as string[]).includes(roleName)) { return true; }
    }
    return false;
  }
}
