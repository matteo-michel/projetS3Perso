import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt/';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  helper = new JwtHelperService();

  constructor() {}

  public isAuthenticated(): boolean {

    const token = localStorage.getItem('token');
    return !this.helper.isTokenExpired(token);
  }
}
