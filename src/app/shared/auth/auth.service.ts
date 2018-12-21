import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CookieService } from '../services/cookie.service';

@Injectable()
export class AuthService {
  private jwtHelper;

  constructor(public cookieService:CookieService) {
    this.jwtHelper=new JwtHelperService();
  }

  public isAuthenticated(): boolean {
    let storage = JSON.parse(this.cookieService.readCookie('storage'));
    if(storage!=null) {
      const token = storage.token;
      return !this.jwtHelper.isTokenExpired(token);
    } else 
    return false;

  }

}