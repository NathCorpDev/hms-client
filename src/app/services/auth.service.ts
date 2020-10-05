import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';

import jwt_decode from "jwt-decode";

export interface User {
  name: string,
  email: string,
  password: string,
  confirmPassword: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  _url = 'http://localhost:1337/api/users';

  constructor(private _http: HttpClient, private router: Router) { }

  createUser(user: User) {
    return this._http.post<User>(this._url + '/register', user)
      .pipe(
        map(res => { return res; }),
        catchError(this.handleError)
      );
  }

  signIn(user: any) {
    return this._http.post<any>(this._url + '/login', user)
      .pipe(
        map(res => { return res; }),
        catchError(this.handleError)
      );
  }

  isLoggedIn() {
    return !!localStorage.getItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  logOut() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }

  dashboard() {
    return this._http.get<any>(this._url + '/dashboard')
      .pipe(
        map(res => { return res; }),
        catchError(this.handleError)
      );
  }

  isAuthorized(roles: string[]): boolean {
    if (roles == null || roles.length === 0) {
      return true;
    }

    const token = localStorage.getItem('token');

    const decodeToken = jwt_decode(token);

    if (!decodeToken) {
      console.log('Invalid token');
      return false;
    }

    return roles.includes(decodeToken['profile']);
  }

  getProfile() {
    const token = localStorage.getItem('token');
    if (token) return jwt_decode(token).profile;
  }

  handleError(error: any) {
    if (error instanceof HttpErrorResponse) { return throwError(error); }
    else { return throwError(error); }
  }
}
